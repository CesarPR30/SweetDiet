import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // Ajusta la ruta según tu estructura

const Register6 = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Desestructuración de parámetros de la ruta
  const { 
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
    edad 
  } = route.params;

  const handleRegister = async () => {
    try {
      // Registro en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Guardar información adicional en Firestore
      const userRef = doc(db, 'users', user.uid);

      await setDoc(userRef, {
        name,
        email,
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
        edad
      });

      // Navegar a la pantalla de inicio
      navigation.navigate('InicioB');
    } catch (error) {
      // Elimina o comenta la línea que imprime el error en la consola
      // console.error('Error al registrar:', error.message);
      showAlert(error.code);
    }
  };

  const showAlert = (errorCode) => {
    let errorMessage;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        errorMessage = 'Este correo electrónico ya está en uso. Por favor, utiliza uno diferente.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo electrónico no es válido. Por favor, verifica e intenta de nuevo.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'El registro de cuentas no está habilitado. Contacta al soporte para más información.';
        break;
      case 'auth/weak-password':
        errorMessage = 'La contraseña es muy débil. Por favor, utiliza una contraseña más segura.';
        break;
      default:
        errorMessage = 'Hubo un error al registrar. Por favor, intenta de nuevo más tarde.';
        break;
    }
    Alert.alert('Error', errorMessage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <FontAwesome name="envelope" size={80} color="#7DB866" />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="#7DB866" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
  iconContainer: {
    marginBottom: 30,
  },
  form: {
    width: '85%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#7DB866',
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: '#7DB866',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Register6;
