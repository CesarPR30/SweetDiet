import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const Metro = ({ navigation }) => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const ingredients = [];

        if (user) {

          const userId = user.uid;
          console.log(userId);
          const startDate = moment().format('YYYY-MM-DD');
          const endDate = moment().add(1, 'days').format('YYYY-MM-DD');

          for (let date = moment(startDate); date.isBefore(endDate); date.add(1, 'days')) {
            const dateStr = date.format('YYYY-MM-DD');
            const userMealsRef = collection(db, 'user_recipes', userId, 'meals');
            const dateMealsDoc = doc(userMealsRef, dateStr);

            const docSnapshot = await getDoc(dateMealsDoc);

            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                Object.values(data).forEach(mealType => {
                  if (mealType.Bebida) {
                    ingredients.push(...(mealType.Bebida.Ingredientes || []));
                  }
                  if (mealType.Plato) {
                    ingredients.push(...(mealType.Plato.Ingredientes || []));
                  }
                });
            } else {
              console.log(`No data found for date: ${date}`);
            }
          }
        } else {
          console.error('No user is signed in');
          setLoading(false);
          return;
        }

        console.log(ingredients)
        if (ingredients.length > 0) {
          const response = await fetch('http://192.168.18.7:5002/busqueda-metro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ busquedas: ingredients }),
          });

          if (response.ok) {
            const data = await response.json();
            setIngredientsList(data);
          } else {
            console.error('Error fetching data from Metro API');
          }
        } else {
          console.log('No ingredients found for the selected date range');
        }
      } catch (error) {
        console.error('Error fetching prices from Metro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const handleCheckboxToggle = (index) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.productTitle}>{item.producto}</Text>
        <Text style={styles.price}>S/ {item.precio}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => handleCheckboxToggle(index)}
      >
        {checkedState[index] ? (
          <Ionicons name="checkbox" size={35} color="green" />
        ) : (
          <Ionicons name="square-outline" size={35} color="gray" />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList style={styles.block}
          data={ingredientsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={<View style={{ height: 150 }} />} // Adds some space between the title and the first item
        />
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7DB866',
    top: '10%',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ECF9EF',
    elevation: 2, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.1, // For iOS
    shadowRadius: 4, // For iOS
    marginRight: 25,
    marginLeft: 25,
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weight: {
    fontSize: 14,
    color: '#777',
  },
  price: {
    fontSize: 16,
    color: '#555',
  },
  checkboxContainer: {
    marginLeft: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Metro;