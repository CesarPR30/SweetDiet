import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Usa Ionicons de Expo

import Inicio from './screens/Inicio';
import Plan from './screens/Plan';
import Scanner from './screens/Scanner';
import Compra from './screens/Compra';
import Perfil from './screens/Perfil';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#91C788', // Color activo
        tabBarInactiveTintColor: '#D9D9D9', // Color inactivo
        tabBarShowLabel: false, // Ocultar etiquetas
        tabBarStyle: {
          borderTopWidth: 0, // Eliminar la línea divisoria
          elevation: 0, // Eliminar la sombra en Android
          shadowOpacity: 0, // Eliminar la sombra en iOS
          height: 80, // Ajustar la altura del tab bar
          paddingHorizontal: 20, // Ajustar el padding horizontal
        },
        tabBarItemStyle: {
          marginHorizontal: 10, // Ajustar el margen entre los íconos
        },
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;

          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Plan':
              iconName = focused ? 'logo-apple' : 'logo-apple';
              break;
            case 'Scanner':
                iconName = focused ? 'scan' : 'scan';
                break;
            case 'Compra':
              iconName = focused ? 'cart' : 'cart';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person';
              break;
            default:
              iconName = 'home';
          }

          const iconSize = focused ? 50 : 35; // Ajustar tamaño del ícono

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Plan" component={Plan} />
      <Tab.Screen name="Scanner" component={Scanner} options={{ tabBarStyle: { display: 'none' } }}></Tab.Screen>
      <Tab.Screen name="Compra" component={Compra} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;