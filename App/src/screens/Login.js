import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const handleNavigateToLogin1 = () => {
    navigation.navigate('Login1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.appleButton]}>
          <Ionicons name="logo-apple" size={24} color="#fff" style={styles.icon} />
          <Text style={[styles.buttonText, styles.appleText]}>Iniciar con Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.googleButton]}>
          <AntDesign name="google" size={24} color="#ccc" style={styles.icon} />
          <Text style={[styles.buttonText, styles.googleText]}>Iniciar con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.facebookButton]}>
          <FontAwesome name="facebook-f" size={24} color="#fff" style={styles.icon} />
          <Text style={[styles.buttonText, styles.facebookText]}>Iniciar con Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.emailButton]} onPress={handleNavigateToLogin1}>
          <Ionicons name="mail" size={24} color="#fff" style={styles.icon} />
          <Text style={[styles.buttonText, styles.emailText]}>Iniciar con Correo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Al continuar, estarás aceptando nuestros:{' '}
        </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Términos y Condiciones</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}> y </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Política de Privacidad</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
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
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 75,
    marginVertical: 10,
    borderRadius: 15,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  appleText: {
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 11.2,
    elevation: 10,
  },
  googleText: {
    color: '#000',
  },
  facebookButton: {
    backgroundColor: '#4B69A9',
  },
  facebookText: {
    color: '#fff',
  },
  emailButton: {
    backgroundColor: '#7CBC71',
  },
  emailText: {
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  linkText: {
    fontSize: 14,
    color: '#7DB866',
    textDecorationLine: 'underline',
  },
});

export default Login;
