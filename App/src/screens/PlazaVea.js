import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import moment from 'moment';

const PlazaVea = () => {
    const [ingredientsList, setIngredientsList] = useState([]);
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
            const endDate = moment().add(6, 'days').format('YYYY-MM-DD');
  
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
            const response = await fetch('http://192.168.18.7:5002/busqueda-plaza-vea', {
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
              console.error('Error fetching data from PlazaVea API');
            }
          } else {
            console.log('No ingredients found for the selected date range');
          }
        } catch (error) {
          console.error('Error fetching prices from PlazaVea:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPrices();
    }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.producto}</Text>
      <Text style={styles.price}>Precio: S/. {item.precio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={ingredientsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    elevation: 2, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.1, // For iOS
    shadowRadius: 4, // For iOS
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#555',
  },
});

export default PlazaVea;