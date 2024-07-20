import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Register2 = ({ navigation, route }) => {
  const {
    selectedActivity,
    selectedGender,
    birthdate,
    height,
    weight,
  } = route.params;

  const [activityLevel, setActivityLevel] = useState(null);

  const handleSelectActivityLevel = (level) => {
    setActivityLevel(level);
  };

  const handleContinue = () => {
    navigation.navigate('Register3', {
      selectedActivity,
      selectedGender,
      birthdate,
      height,
      weight,
      activityLevel,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { marginTop: 20 }]}>¿Cuál es tu nivel de actividad física?</Text>
        <TouchableOpacity
          style={[styles.activityButton, activityLevel === 1 && styles.selected]}
          onPress={() => handleSelectActivityLevel(1)}
        >
          <Text style={[styles.activityButtonText, activityLevel === 1 && styles.selectedText]}>Sedentario</Text>
          <Text style={[styles.activityButtonDesc, activityLevel === 1 && styles.selectedText]}>Nada o poco ejercicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.activityButton, activityLevel === 2 && styles.selected]}
          onPress={() => handleSelectActivityLevel(2)}
        >
          <Text style={[styles.activityButtonText, activityLevel === 2 && styles.selectedText]}>Ligera</Text>
          <Text style={[styles.activityButtonDesc, activityLevel === 2 && styles.selectedText]}>Ejercicio 2-3 días por semana</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.activityButton, activityLevel === 3 && styles.selected]}
          onPress={() => handleSelectActivityLevel(3)}
        >
          <Text style={[styles.activityButtonText, activityLevel === 3 && styles.selectedText]}>Moderada</Text>
          <Text style={[styles.activityButtonDesc, activityLevel === 3 && styles.selectedText]}>Ejercicio 4-5 días por semana</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.activityButton, activityLevel === 4 && styles.selected]}
          onPress={() => handleSelectActivityLevel(4)}
        >
          <Text style={[styles.activityButtonText, activityLevel === 4 && styles.selectedText]}>Alta</Text>
          <Text style={[styles.activityButtonDesc, activityLevel === 4 && styles.selectedText]}>Ejercicio 6-7 días por semana</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.activityButton, activityLevel === 5 && styles.selected]}
          onPress={() => handleSelectActivityLevel(5)}
        >
          <Text style={[styles.activityButtonText, activityLevel === 5 && styles.selectedText]}>Alta profesional</Text>
          <Text style={[styles.activityButtonDesc, activityLevel === 5 && styles.selectedText]}>Ejercicio intenso 6-7 días por semana</Text>
        </TouchableOpacity>

        {/* Botón Continuar similar al de Register1 */}
        <TouchableOpacity
          style={[styles.continueButton, { opacity: activityLevel ? 1 : 0.5 }]}
          onPress={handleContinue}
          disabled={!activityLevel}
        >
          <Text style={[styles.continueText, { color: activityLevel ? '#7DB866' : '#ccc' }]}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    position: 'absolute',
    top: 15,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7DB866',
  },
  activityButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  activityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  activityButtonDesc: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },  
  selected: {
    backgroundColor: '#7DB866',
  },
  selectedText: {
    color: '#FFFFFF', // Cambia el color del texto a blanco cuando está seleccionado
  },
});

export default Register2;
