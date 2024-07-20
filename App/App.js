import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Slider from './src/component/Slider';
import Login from './src/screens/Login';
import Login1 from './src/screens/Login1';
import Register from './src/screens/Register';
import Register1 from './src/screens/Register1'; 
import Register2 from './src/screens/Register2'; 
import Register3 from './src/screens/Register3'; 
import Register4 from './src/screens/Register4';
import Register5 from './src/screens/Register5';
import Register6 from './src/screens/Register6';
import BottomTabNavigator from './src/BottomTabNavigator'; // Asegúrate de importar el BottomTabNavigator
import Compra from './src/screens/Compra';
import Metro from './src/screens/Metro';
import PlazaVea from './src/screens/PlazaVea';
import MealDetails from './src/screens/MealDetails'

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('Register'); 
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Slider />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>EMPEZAR</Text>
      </TouchableOpacity>
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Inicia Sesión
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Login1" component={Login1} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Register1" component={Register1} />
        <Stack.Screen name="Register2" component={Register2} />
        <Stack.Screen name="Register3" component={Register3} />
        <Stack.Screen name="Register4" component={Register4} />
        <Stack.Screen name="Register5" component={Register5} />
        <Stack.Screen name="Register6" component={Register6} />
        <Stack.Screen name="InicioB" component={BottomTabNavigator} />
        <Stack.Screen name="Compra" component={Compra} />
        <Stack.Screen name="Metro" component={Metro} />
        <Stack.Screen name="PlazaVea" component={PlazaVea} />
        <Stack.Screen 
          name="MealDetails" 
          component={MealDetails} 
          options={{ 
            presentation: 'modal' // Esto hace que la pantalla se deslice desde abajo
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7DB866',
    padding: 20,
    borderRadius: 10,
    width: '75%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginTextContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    color: '#7DB866',
    fontWeight: '600',
  },
});