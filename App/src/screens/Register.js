import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Register = ({ navigation }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  useEffect(() => {
    setIsContinueEnabled(selectedActivity !== null);
  }, [selectedActivity]);

  const handleSelectActivity = (activity) => {
    let mappedActivity;
    switch (activity) {
      case 'loseFat':
        mappedActivity = 'perder';
        break;
      case 'maintainWeight':
        mappedActivity = 'mantener';
        break;
      case 'gainMuscle':
        mappedActivity = 'ganar';
        break;
      default:
        mappedActivity = null;
    }
    setSelectedActivity(mappedActivity);
    // Navigate to Register1 screen
    navigation.navigate('Register1', { selectedActivity: mappedActivity });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
      <Text style={styles.title}>¿Cuál es tu objetivo?</Text>
      <View style={styles.activityContainer}>
        <TouchableOpacity
          style={[styles.activityButton, selectedActivity === 'perder' && styles.selected]}
          onPress={() => handleSelectActivity('loseFat')}
        >
          <MaterialIcons name="trending-down" size={40} color={selectedActivity === 'perder' ? '#FFFFFF' : '#7DB866'} />
          <View style={styles.textContainer}>
            <Text style={[styles.activityTitle, selectedActivity === 'perder' && styles.selectedText]}>Perder Grasa</Text>
            <Text style={[styles.activityDescription, selectedActivity === 'perder' && styles.selectedText]}>Maximiza la pérdida de grasa y conserva tu masa muscular</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.activityButton, selectedActivity === 'mantener' && styles.selected]}
          onPress={() => handleSelectActivity('maintainWeight')}
        >
          <MaterialIcons name="trending-neutral" size={40} color={selectedActivity === 'mantener' ? '#FFFFFF' : '#7DB866'} />
          <View style={styles.textContainer}>
            <Text style={[styles.activityTitle, selectedActivity === 'mantener' && styles.selectedText]}>Mantener Peso</Text>
            <Text style={[styles.activityDescription, selectedActivity === 'mantener' && styles.selectedText]}>Maximiza la pérdida de grasa y conserva tu masa muscular</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.activityButton, selectedActivity === 'ganar' && styles.selected]}
          onPress={() => handleSelectActivity('gainMuscle')}
        >
          <MaterialIcons name="trending-up" size={40} color={selectedActivity === 'ganar' ? '#FFFFFF' : '#7DB866'} />
          <View style={styles.textContainer}>
            <Text style={[styles.activityTitle, selectedActivity === 'ganar' && styles.selectedText]}>Ganar Músculo</Text>
            <Text style={[styles.activityDescription, selectedActivity === 'ganar' && styles.selectedText]}>Maximiza la pérdida de grasa y conserva tu masa muscular</Text>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  activityContainer: {
    width: '80%',
  },
  activityButton: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  activityDescription: {
    fontSize: 14,
    color: '#000000',
  },
  selected: {
    backgroundColor: '#7DB866',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default Register;
