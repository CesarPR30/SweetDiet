import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const MealDetails = ({ route, navigation }) => {
  const { meal } = route.params;
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        // Aquí, asumimos que ya tienes la URL de la imagen guardada en la base de datos y la estás pasando como parte de `meal`
        setImageUrl(meal.imageUrl); // Asegúrate de que `meal.imageUrl` tenga el campo correcto
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrl();
  }, [meal]);

  const renderBulletPoint = ({ item }) => (
    <Text style={styles.bulletPoint}>• {item}</Text>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={30} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.title}>{meal.Titulo}</Text>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#7CBC71" />
        </View>
      ) : imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>Imagen no disponible</Text>
      )}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Dificultad</Text>
            <Text style={styles.infoValue}>{meal.Dificultad || 'Fácil'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Tiempo</Text>
            <Text style={styles.infoValue}>{meal.Tiempo || 'No disponible'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Kcal</Text>
            <Text style={styles.infoValue}>{meal.Kcal || '10'} kcal</Text>
          </View>
        </View>
      </View>
      <Text style={styles.details1}>Ingredientes</Text>
      <FlatList
        data={meal.Ingredientes || []}
        renderItem={renderBulletPoint}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.details1}>¡A cocinar!</Text>
      <FlatList
        data={meal.Preparacion || []}
        renderItem={renderBulletPoint}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1, // Asegura que el ícono esté encima de otros elementos
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 50,
    marginBottom: 10,
    width: '75%', // Establece el ancho al 75%
    alignSelf: 'center', // Centra el título horizontalmente dentro del contenedor
  },  
  image: {
    width: '90%',
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  noImage: {
    color: '#A9A9A9',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  loaderContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#F0FFED',
    paddingVertical: 30,
    marginBottom: 20,
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  infoLabel: {
    color: '#7CBC71',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoValue: {
    color: '#7CBC71',
    fontSize: 20,
  },
  details1: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bulletPoint: {
    color: '#A9A9A9',
    fontSize: 18,
    marginVertical: 5,
  },
});

export default MealDetails;
