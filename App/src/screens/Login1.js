import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig'; // Asegúrate de tener esta exportación en tu archivo firebaseConfig.js

const auth = getAuth(app);

const Login1 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('InicioB');
    } catch (error) {
      // Elimina o comenta la línea que imprime el error en la consola
      // console.error('Error al iniciar sesión:', error.message);
      showAlert(error.code);
    }
  };

  const showAlert = (errorCode) => {
    let errorMessage;
    switch (errorCode) {
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo electrónico no es válido. Por favor, verifica e intenta de nuevo.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Esta cuenta ha sido deshabilitada. Contacta al soporte para más información.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No se encontró ninguna cuenta con este correo electrónico. Por favor, verifica e intenta de nuevo.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'La contraseña es incorrecta. Por favor, verifica e intenta de nuevo.';
        break;
      default:
        errorMessage = 'Hubo un error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
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
        <FontAwesome name="lock" size={80} color="#7DB866" />
      </View>
      <View style={styles.form}>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            ¿No tienes una cuenta?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')} // Asegúrate de tener una pantalla de registro
            >
              Regístrate
            </Text>
          </Text>
        </View>
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
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#333',
  },
  registerLink: {
    color: '#7DB866',
    fontWeight: '600',
  },
});

export default Login1;
