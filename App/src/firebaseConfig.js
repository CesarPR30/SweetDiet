import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZodIg9-iVaySdjcvhz_duqeh4V24lpD8",
  authDomain: "loginsd-a8608.firebaseapp.com",
  projectId: "loginsd-a8608",
  storageBucket: "loginsd-a8608.appspot.com",
  messagingSenderId: "357632912683",
  appId: "1:357632912683:web:6ce5b4dc76328a5dca296e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicializa la autenticación de Firebase con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, db, auth };
