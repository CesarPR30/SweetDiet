import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { app } from '../firebaseConfig';

export default function Perfil() {
  const [userName, setUserName] = useState('');
  const [userWeight, setUserWeight] = useState({ start: null, current: null, goal: null });
  const [weightData, setWeightData] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore(app);

        // Fetch user data
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
          setUserWeight({
            start: userData.weight || 0,
            goal: userData.pesoObjetivo || 0
          });

          // Fetch weight data
          const weightDocRef = doc(db, 'user_weight', user.uid);
          const weightDoc = await getDoc(weightDocRef);
          if (weightDoc.exists()) {
            const weightEntries = weightDoc.data().Peso;
            const formattedEntries = weightEntries.map(entry => ({
              ...entry,
              FechaDeSubida: new Date(entry.FechaDeSubida)
            }));

            // Sort and slice the data
            formattedEntries.sort((a, b) => b.FechaDeSubida - a.FechaDeSubida); // Newest to oldest
            setWeightData(formattedEntries.slice(0, 5));

            // Set current weight to the last entry
            if (formattedEntries.length > 0) {
              setUserWeight(prev => ({
                ...prev,
                current: formattedEntries[0].peso // Most recent weight
              }));
            }
          } else {
            // Create initial weight document
            await setDoc(weightDocRef, {
              Peso: [{
                peso: userData.weight || 0,
                FechaDeSubida: new Date().toISOString()
              }]
            });
            setWeightData([{
              peso: userData.weight || 0,
              FechaDeSubida: new Date()
            }]);

            // Set current weight to the initial weight
            setUserWeight(prev => ({
              ...prev,
              current: userData.weight || 0
            }));
          }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleAddWeight = async () => {
    if (!newWeight || isNaN(newWeight)) {
      Alert.alert('Error', 'Por favor ingresa un peso válido.');
      return;
    }

    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore(app);
      const weightDocRef = doc(db, 'user_weight', user.uid);

      // Fetch existing data
      const weightDoc = await getDoc(weightDocRef);
      const existingWeights = weightDoc.exists() ? weightDoc.data().Peso : [];

      // Add new weight entry
      const updatedWeights = [
        ...existingWeights,
        {
          peso: parseFloat(newWeight),
          FechaDeSubida: new Date().toISOString()
        }
      ];

      await setDoc(weightDocRef, { Peso: updatedWeights });

      // Update state
      const formattedEntries = updatedWeights.map(entry => ({
        ...entry,
        FechaDeSubida: new Date(entry.FechaDeSubida)
      }));

      formattedEntries.sort((a, b) => b.FechaDeSubida - a.FechaDeSubida); // Newest to oldest
      setWeightData(formattedEntries.slice(0, 5));
      setUserWeight(prev => ({
        ...prev,
        current: parseFloat(newWeight) // Update current weight
      }));
      setNewWeight('');
      Alert.alert('Éxito', 'Peso añadido correctamente.');
    }
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.profileContainer}>
          <View style={styles.profileIconContainer}>
            <Ionicons name="person-circle" size={180} color="#7DB866" style={styles.icon} />
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={styles.weightContainer}>
          <View style={styles.weightSection}>
            <Text style={styles.weightLabel}>Inicio</Text>
            <Text style={styles.weightValue1}>{userWeight.start ? `${userWeight.start} kg` : 'Cargando...'}</Text>
          </View>
          <View style={styles.weightSection}>
            <Text style={styles.weightLabel}>Actual</Text>
            <Text style={styles.weightValue2}>{userWeight.current ? `${userWeight.current} kg` : 'Cargando...'}</Text>
          </View>
          <View style={styles.weightSection}>
            <Text style={styles.weightLabel}>Objetivo</Text>
            <Text style={styles.weightValue3}>{userWeight.goal ? `${userWeight.goal} kg` : 'Cargando...'}</Text>
          </View>
        </View>
        {weightData.length > 0 ? (
        <LineChart
          data={{
            labels: weightData.slice().reverse().map(entry => formatDate(entry.FechaDeSubida)),
            datasets: [
              {
                data: weightData.slice().reverse().map(entry => parseFloat(entry.peso))
              }
            ],
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisSuffix=" kg"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(215, 162, 81, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#D7A251',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>No hay datos de peso disponibles</Text>
      )}

        <TouchableOpacity style={styles.addWeightButton} onPress={handleAddWeight}>
          <Text style={styles.addWeightButtonText}>Agregar Peso</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Ingrese nuevo peso"
          keyboardType="numeric"
          value={newWeight}
          onChangeText={setNewWeight}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 90,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7DB866',
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileIconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  weightSection: {
    alignItems: 'center',
  },
  weightLabel: {
    fontSize: 16,
    color: '#888',
  },
  weightValue1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888888',
  },
  weightValue2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF725E',
  },
  weightValue3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7CBC71',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
  addWeightButton: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#7CBC71',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWeightButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});