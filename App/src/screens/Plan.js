import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ajusta la ruta según tu estructura
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const MAX_RETRIES = 5; // Máximo número de reintentos

const Plan = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [noMealsMessage, setNoMealsMessage] = useState('');
  const [canGoBack, setCanGoBack] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Mostrar el indicador de carga al comenzar la carga de datos
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const { allergies, dislikes, kcalDiarias } = userData;
            const mealsFromFirebase = await fetchMealsFromFirebase(user.uid, selectedDate);

            if (mealsFromFirebase.length > 0) {
              setMeals(mealsFromFirebase);
              setNoMealsMessage('');
            } else {
              if (moment(selectedDate).isBefore(moment().format('YYYY-MM-DD'), 'day')) {
                setNoMealsMessage('No se pueden generar comidas para fechas anteriores.');
                setMeals([]);
              } else {
                setNoMealsMessage('');
                const mealsData = await fetchMealsWithRetry(kcalDiarias, allergies, dislikes);
                await saveMealsToFirebase(user.uid, mealsData.Comidas, selectedDate);
                const newMealsFromFirebase = await fetchMealsFromFirebase(user.uid, selectedDate);
                setMeals(newMealsFromFirebase);
              }
            }
          } else {
            console.error('No user data found');
          }
        } else {
          console.error('No user is signed in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Ocultar el indicador de carga una vez que se han cargado los datos
      }
    };

    fetchUserData();
  }, [selectedDate]);

  useEffect(() => {
    // Verifica si se puede retroceder de acuerdo con la disponibilidad de comidas
    const checkCanGoBack = async () => {
      if (moment(selectedDate).isBefore(moment().format('YYYY-MM-DD'), 'day')) {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userMealsFromFirebase = await fetchMealsFromFirebase(user.uid, moment(selectedDate).subtract(1, 'days').format('YYYY-MM-DD'));

          if (userMealsFromFirebase.length > 0) {
            setCanGoBack(true);
          } else {
            setCanGoBack(false);
          }
        }
      }
    };

    checkCanGoBack();
  }, [selectedDate]);

  const fetchMealsWithRetry = async (kcalDiarias, allergies, dislikes, retries = MAX_RETRIES) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        const response = await fetch('http://192.168.18.7:5000/generate_meal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            kcal: kcalDiarias,
            allergies: allergies || [],
            dislikes: dislikes || [],
          }),
        });

        if (response.ok) {
          return await response.json();
        } else {
          console.error('Error fetching data from API');
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }

      attempt++;
      // Espera antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    throw new Error('Failed to fetch data after multiple attempts');
  };

  const saveMealsToFirebase = async (userId, comidas, date) => {
    const userMealsRef = collection(db, 'user_recipes', userId, 'meals');

    const mealsByType = ['Desayuno', 'Almuerzo', 'Cena'].reduce((acc, mealType) => {
      const meal = comidas[mealType];
      if (meal) {
        acc[mealType] = {
          Bebida: meal.Bebida,
          Plato: meal.Plato,
        };
      }
      return acc;
    }, {});

    await setDoc(doc(userMealsRef, date), mealsByType);
  };

  const fetchMealsFromFirebase = async (userId, date) => {
    const userMealsRef = collection(db, 'user_recipes', userId, 'meals');
    const dateMealsDoc = doc(userMealsRef, date);
    const docSnapshot = await getDoc(dateMealsDoc);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const allMeals = [];

      for (const [mealType, mealData] of Object.entries(data)) {
        if (mealData) {
          allMeals.push({
            mealType,
            tipo: 'Bebida',
            ...mealData.Bebida,
          });
          allMeals.push({
            mealType,
            tipo: 'Plato',
            ...mealData.Plato,
          });
        }
      }

      const mealsWithImages = await Promise.all(
        allMeals.map(async (meal) => {
          const imageUrl = await fetchImage(meal.Titulo);
          return { ...meal, imageUrl };
        })
      );

      return mealsWithImages;
    } else {
      // Si no hay datos, simplemente retorna una lista vacía
      return [];
    }
  };

  const fetchImage = async (query) => {
    try {
      const imageCacheRef = doc(db, 'image_meals', query);
      const cachedImage = await getDoc(imageCacheRef);

      if (cachedImage.exists()) {
        return cachedImage.data().url;
      } else {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
          params: {
            key: 'AIzaSyBijpdm4Z0t3EHB_loVO3KH40VYKfm5nEI',
            cx: 'd4eb16ae42d5345a4',
            q: query,
            searchType: 'image',
            num: 1,
          },
        });

        if (response.data.items && response.data.items.length > 0) {
          const imageUrl = response.data.items[0].link;
          await setDoc(imageCacheRef, { url: imageUrl });
          return imageUrl;
        }
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Rate limit exceeded. Please try again later.');
      } else {
        console.error('Error fetching image:', error);
      }
      return null;
    }
  };

  const handlePress = (meal) => {
    navigation.navigate('MealDetails', { meal });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.Titulo} // Añade una key única aquí
      style={styles.itemContainer}
      onPress={() => handlePress(item)}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator size="small" color="#7CBC71" />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.kcal}>{item.Kcal ?? 10} kcal</Text>
        <Text style={styles.title}>{item.Titulo}</Text>
        <Text style={styles.time}>{item.Tiempo}</Text>
      </View>
    </TouchableOpacity>
  );
  

  const renderMealSection = (mealType) => {
    const mealsForType = meals.filter(meal => meal.mealType === mealType);
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>{mealType}</Text>
        {mealsForType.length > 0 ? (
          mealsForType.map((meal, index) => renderItem({ item: meal }))
        ) : (
          <Text style={styles.noDataText}>No hay {mealType.toLowerCase()} para esta fecha</Text>
        )}
      </View>
    );
  };

  const changeDate = (direction) => {
    const newDate = moment(selectedDate).add(direction, 'days').format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plan Nutricional</Text>
      <View style={styles.dateNavigation}>
        <TouchableOpacity
          onPress={() => {
            if (canGoBack) {
              setLoading(true);
              changeDate(-1);
            }
          }}
          style={[styles.navButton, { opacity: canGoBack ? 1 : 0.5 }]}
          disabled={!canGoBack}
        >
          <Ionicons name="chevron-back-sharp" size={24} color="#7DB866" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{selectedDate}</Text>
        <TouchableOpacity
          onPress={() => {
            setLoading(true); // Mostrar el indicador de carga al cambiar la fecha
            changeDate(1);
          }}
          style={styles.navButton}
        >
          <Ionicons name="chevron-forward-sharp" size={24} color="#7DB866" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#7DB866" style={styles.loader} />
      ) : (
        <ScrollView>
          {noMealsMessage ? (
            <Text style={styles.noDataText}>{noMealsMessage}</Text>
          ) : (
            <>
              {renderMealSection('Desayuno')}
              {renderMealSection('Almuerzo')}
              {renderMealSection('Cena')}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 20,
  },
  header: {
    paddingTop: 60,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7DB866',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#888888',
  },
  loader: {
    marginTop: 50,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    backgroundColor:  '#ECF9EF',
    borderBottomColor: '#eee',
    paddingVertical: 10,
    borderRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    padding: 4,
    marginRight: 15,
    marginLeft: 15,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  kcal: {
    fontSize: 14,
    color: '#7DB866',
  },
  time: {
    fontSize: 14,
    color: '#888',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Plan;
