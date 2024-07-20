import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { getFirestore, doc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebaseConfig'; // Asegúrate de importar tu instancia de Firebase aquí
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [meals, setMeals] = useState([]);
    const [loadingMeals, setLoadingMeals] = useState(true);

    useEffect(() => {
        const fetchUserName = async () => {
            const auth = getAuth(app);
            const user = auth.currentUser;
            if (user) {
                const db = getFirestore(app);
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name);
                }
            }
            setLoading(false);
        };

        const fetchMeals = async () => {
            try {
                const auth = getAuth(app);
                const user = auth.currentUser;
        
                if (user) {
                    const db = getFirestore(app);
                    const userMealsRef = collection(db, 'user_recipes', user.uid, 'meals');
                    const imageMealsRef = collection(db, 'image_meals');
                    const today = moment();
                    const daysToFetch = 7;
        
                    let withoutRating = [];
        
                    for (let i = 0; i <= daysToFetch; i++) { // Cambia "i < daysToFetch" a "i <= daysToFetch" para incluir el día de hoy
                        const date = today.clone().subtract(i, 'days').format('YYYY-MM-DD'); // Cambia "i + 1" a "i" para incluir el día de hoy
                        const dateMealsRef = doc(userMealsRef, date);
                        const docSnapshot = await getDoc(dateMealsRef);
        
                        if (docSnapshot.exists()) {
                            const data = docSnapshot.data();
        
                            // Manejo de desayuno
                            if (data['Desayuno']) {
                                const desayuno = data['Desayuno'];
                                if (desayuno.Bebida) {
                                    const bebida = { fecha: date, mealType: 'Desayuno', type: 'Bebida', ...desayuno.Bebida };
                                    if (!bebida.Calificacion) {
                                        const imageDocRef = doc(imageMealsRef, bebida.Titulo);
                                        const imageDocSnapshot = await getDoc(imageDocRef);
                                        if (imageDocSnapshot.exists()) {
                                            bebida.imageUrl = imageDocSnapshot.data().url;
                                        }
                                        withoutRating.push(bebida);
                                    }
                                }
                                if (desayuno.Plato) {
                                    const plato = { fecha: date, mealType: 'Desayuno', type: 'Plato', ...desayuno.Plato };
                                    if (!plato.Calificacion) {
                                        const imageDocRef = doc(imageMealsRef, plato.Titulo);
                                        const imageDocSnapshot = await getDoc(imageDocRef);
                                        if (imageDocSnapshot.exists()) {
                                            plato.imageUrl = imageDocSnapshot.data().url;
                                        }
                                        withoutRating.push(plato);
                                    }
                                }
                            }
        
                            // Manejo de almuerzo
                            if (data['Almuerzo']) {
                                const almuerzo = data['Almuerzo'];
                                if (almuerzo.Bebida) {
                                    const bebida = { fecha: date, mealType: 'Almuerzo', type: 'Bebida', ...almuerzo.Bebida };
                                    if (!bebida.Calificacion) {
                                        const imageDocRef = doc(imageMealsRef, bebida.Titulo);
                                        const imageDocSnapshot = await getDoc(imageDocRef);
                                        if (imageDocSnapshot.exists()) {
                                            bebida.imageUrl = imageDocSnapshot.data().url;
                                        }
                                        withoutRating.push(bebida);
                                    }
                                }
                                if (almuerzo.Plato) {
                                    const plato = { fecha: date, mealType: 'Almuerzo', type: 'Plato', ...almuerzo.Plato };
                                    if (!plato.Calificacion) {
                                        const imageDocRef = doc(imageMealsRef, plato.Titulo);
                                        const imageDocSnapshot = await getDoc(imageDocRef);
                                        if (imageDocSnapshot.exists()) {
                                            plato.imageUrl = imageDocSnapshot.data().url;
                                        }
                                        withoutRating.push(plato);
                                    }
                                }
                            }
        
                            // Manejo de cena
                            if (data['Cena']) {
                                const cena = data['Cena'];
                                if (cena.Bebida) {
                                    const bebida = { fecha: date, mealType: 'Cena', type: 'Bebida', ...cena.Bebida };
                                    if (!bebida.Calificacion) {
                                        const imageDocRef = doc(imageMealsRef, bebida.Titulo);
                                        const imageDocSnapshot = await getDoc(imageDocRef);
                                        if (imageDocSnapshot.exists()) {
                                            bebida.imageUrl = imageDocSnapshot.data().url;
                                        }
                                        withoutRating.push(bebida);
                                    }
                                }
                                if (cena.Plato) {
                                    const plato = { fecha: date, mealType: 'Cena', type: 'Plato', ...cena.Plato };
                                    if (!plato.Calificacion) {
                                        const imageDocRef = doc(imageMealsRef, plato.Titulo);
                                        const imageDocSnapshot = await getDoc(imageDocRef);
                                        if (imageDocSnapshot.exists()) {
                                            plato.imageUrl = imageDocSnapshot.data().url;
                                        }
                                        withoutRating.push(plato);
                                    }
                                }
                            }
                        }
                    }
        
                    setMeals(withoutRating);
                } else {
                    console.error('No user is signed in');
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
            } finally {
                setLoadingMeals(false);
            }
        };
        
        fetchUserName();
        fetchMeals();
    }, []);

    const handleRatingCompleted = (meal, rating) => {
        Alert.alert(
            'Confirmación de Calificación',
            `¿Deseas calificar "${meal.Titulo}" con ${rating} estrellas?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        try {
                            const auth = getAuth(app);
                            const user = auth.currentUser;

                            if (user) {
                                const db = getFirestore(app);
                                const userMealsRef = collection(db, 'user_recipes', user.uid, 'meals');

                                if (!meal.fecha) {
                                    console.error('Fecha no disponible para el meal:', meal);
                                    return;
                                }

                                const mealDocRef = doc(userMealsRef, meal.fecha);

                                // Actualizar calificación dentro del objeto Bebida o Plato específico
                                await updateDoc(mealDocRef, {
                                    [`${meal.mealType}.${meal.type}.Calificacion`]: rating,
                                });

                                // Actualizar la lista de comidas sin calificación
                                const updatedMeals = meals.filter(m => m !== meal);
                                setMeals(updatedMeals);
                            }
                        } catch (error) {
                            console.error('Error updating rating:', error);
                        }
                    },
                },
            ]
        );
    };

    if (loading || loadingMeals) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7DB866" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.greeting}>Hola {userName || 'Usuario'},</Text>
            <Text style={styles.subGreeting}>Conoce, compra y cocina.</Text>

            <View style={styles.card}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>¿No sabes qué almorzar?</Text>
                    <Text style={styles.cardSubtitle}>Mira tu dieta de hoy</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Plan')}
                    >
                        <Text style={styles.buttonText}>Ver Ahora ▶</Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.cardImage} source={require('../assets/inicioImg1.png')} resizeMode="contain" />
            </View>
            <View style={styles.progressCard}>
                <Text style={styles.progressText}>Mira tu progreso semanal</Text>
                <TouchableOpacity
                    style={styles.progressButton}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Text style={styles.progressButtonText}>Mirar ahora ▶</Text>
                </TouchableOpacity>
            </View>
                {meals.length > 0 && (
                <View style={styles.cardTextContainer}>
                    <Text style={styles.ratingTitle}>Califica tus comidas</Text>
                </View>
                )}
                {meals.length > 0 && (
                <ScrollView horizontal style={styles.scrollContainer}>
                    {meals.map((meal, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.itemTitle}>{meal.Titulo}</Text>
                                <View style={styles.ratingContainer}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <TouchableOpacity
                                            key={star}
                                            onPress={() => handleRatingCompleted(meal, star)}
                                            style={styles.star} // Aplica el estilo aquí
                                        >
                                            <Icon name="star" size={30} color={star <= meal.Calificacion ? '#FFD700' : '#E0E0E0'} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      paddingTop: 130,
  },
  loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  greeting: {
      fontSize: 32,
      color: '#77b748',
      fontWeight: 'bold',
      paddingTop: 90,
      textAlign: 'center',
  },
  subGreeting: {
      fontSize: 16,
      color: '#777',
      fontWeight: '500',
      marginBottom: 20,
      textAlign: 'center',
  },
  card: {
      backgroundColor: '#FFF7F0',
      borderRadius: 30,
      padding: 16,
      marginTop: 20,
      marginBottom: 20,
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
  },
  cardTextContainer: {
      flex: 1,
      marginRight: 10,
  },
  cardTitle: {
      fontSize: 14,
      marginHorizontal: 10,
      fontWeight: 'bold',
      color: '#FF8473',
  },
  cardSubtitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginHorizontal: 10,
      marginBottom: 10,
  },
  button: {
      backgroundColor: '#FF8473',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignSelf: 'flex-start',
      marginBottom: 10,
      marginHorizontal: 10,
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  cardImage: {
      width: 100,
      height: 100,
      alignSelf: 'center',
  },
  progressCard: {
      backgroundColor: '#9E9BC7',
      borderRadius: 24,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginHorizontal: 10,
  },
  progressText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      maxWidth: '60%',
  },
  progressButton: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
  },
  progressButtonText: {
      color: '#9E9BC7',
      fontSize: 16,
      fontWeight: 'bold',
  },
  
  ratingTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginLeft: 20,
      marginTop: 20,
  },
  foodCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
  },
  foodImage: {
      width: 90,
      height: 90,
      borderRadius: 10,
      marginRight: 20,
  },
  foodTitle: {
      fontSize: 18,
      color: '#9E9BC7',
      fontWeight: 'bold',
  },
  stars: {
      flexDirection: 'row',
  },
  starButton: {
      marginRight: 5,
  },
  star: {
      fontSize: 40,
      marginRight: 5,
      color: '#D9D9D9',
  },
  selectedStar: {
      color: '#9E9BC7', // Color de estrella seleccionada
  },
  scrollContainer: {
      paddingHorizontal: 10,
      marginVertical: 10,
  },
  sendButton: {
      backgroundColor: '#D9D9D9',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      alignSelf: 'center',
      marginVertical: 20,
      marginBottom: 20,
  },
  sendButtonEnabled: {
      backgroundColor: '#FF8473',
  },
  sendButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold',
  },
  itemContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    marginRight: 60,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
},
infoContainer: {
    maxWidth: '80%',
    flex: 1,
    marginLeft: 10,
    padding: 10,
  },
itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9E9BC7',
    flexWrap: 'wrap', // Permite el ajuste de líneas
},
ratingContainer: {
  flexDirection: 'row',
  marginTop: 10,
},
image: {
  width: 100,
  height: 100,
  marginRight: 10,
  borderRadius: 10,
},

});
