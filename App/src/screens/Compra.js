import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import metroImage from '../assets/metrologo.png'; 
import plazaveaImage from '../assets/plazavealogo.png';

const Compra = () => {
  const navigation = useNavigation();

  return (

    <View style={styles.container}>
    <Text style={styles.title}>Seleccione su supermercado</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Metro')}
      >
        <Image source={metroImage} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PlazaVea')}
      >
        <Image source={plazaveaImage} style={styles.image} />
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20, // Add some padding to avoid button touching the edges
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7DB866',
    top: '20%',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Compra;