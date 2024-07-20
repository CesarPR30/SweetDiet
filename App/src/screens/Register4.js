import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// Función para calcular el peso objetivo
const calcularPesoObjetivo = (altura) => {
  return altura - 100;
};

// Función para calcular las kcal necesarias diarias
const calcularKcalDiarias = (peso, edad, talla, genero, objetivo, actividad) => {
  let tmb;

  if (genero.toLowerCase() === "male") {
    tmb = 88.362 + (13.397 * peso) + (4.799 * talla) - (5.677 * edad);
  } else if (genero.toLowerCase() === "female") {
    tmb = 447.593 + (9.247 * peso) + (3.098 * talla) - (4.330 * edad);
  } else {
    throw new Error("Género no válido. Debe ser 'male' o 'female'.");
  }

  switch (actividad) {
    case 1:
      tmb *= 1.2;
      break;
    case 2:
      tmb *= 1.375;
      break;
    case 3:
      tmb *= 1.55;
      break;
    case 4:
      tmb *= 1.725;
      break;
    case 5:
      tmb *= 1.9;
      break;
    default:
      throw new Error("Nivel de actividad no válido.");
  }

  switch (objetivo.toLowerCase()) {
    case "perder":
      tmb -= 500;
      break;
    case "ganar":
      tmb += 500;
      break;
    case "mantener":
      // No se hace ningún ajuste
      break;
    default:
      throw new Error("Objetivo no válido. Debe ser 'perder', 'ganar' o 'mantener'.");
  }

  return Math.round(tmb);
};

// Función para calcular la edad a partir de la fecha de nacimiento
const calcularEdad = (fechaNacimiento) => {
  const fechaNacimientoDate = new Date(fechaNacimiento);
  const edadDiferencia = Date.now() - fechaNacimientoDate.getTime();
  const edadFecha = new Date(edadDiferencia);
  return Math.abs(edadFecha.getUTCFullYear() - 1970);
};

const Register4 = ({ route, navigation }) => {
  const {
    selectedActivity,
    selectedGender,
    birthdate,
    height,
    weight,
    activityLevel,
    allergies: allergyList,
    dislikes: dislikeList,
  } = route.params;

  // Calcular la edad a partir de la fecha de nacimiento
  const edad = calcularEdad(birthdate);

  // Calcular el peso objetivo
  const pesoObjetivo = calcularPesoObjetivo(height);

  // Calcular las kcal necesarias diarias
  const kcalDiarias = calcularKcalDiarias(weight, edad, height, selectedGender, selectedActivity, activityLevel);

  const handleNavigateToRegister5 = () => {
    navigation.navigate('Register5', {
      selectedActivity,
      selectedGender,
      birthdate,
      height,
      weight,
      activityLevel,
      allergies: allergyList,
      dislikes: dislikeList,
      pesoObjetivo,
      kcalDiarias,
      edad,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Resumen</Text>
        <View style={styles.rowContainer}>
          <Ionicons name="flag" size={24} color="#D7A251" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Peso Objetivo: </Text>
            <Text style={styles.text}>{pesoObjetivo} kg</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <FontAwesome5 name="hotjar" size={24} color="#D7A251" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Caloría para cumplir objetivo:</Text>
            <Text style={styles.text}>~{kcalDiarias} kcal</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={handleNavigateToRegister5}>
          <Text style={styles.continueText}>Crear Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
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
  contentContainer: {
    flex: 1,
    marginTop: '20%',
    paddingLeft: '10%',
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
    alignSelf: 'flex-start', // Alineación a la izquierda
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#7DB866',
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Register4;
