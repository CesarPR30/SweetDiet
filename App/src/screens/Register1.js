import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Register1 = ({ navigation, route }) => {
  const { selectedActivity } = route.params;
  const [selectedGender, setSelectedGender] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthdate, setBirthdate] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  useEffect(() => {
    const allFieldsFilled = selectedGender && birthdate && height && weight;
    setIsContinueEnabled(allFieldsFilled);
  }, [selectedGender, birthdate, height, weight]);

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(false);
    setBirthdate(currentDate);
  };

  const navigateToRegister2 = () => {
    navigation.navigate('Register2', {
      selectedActivity,
      selectedGender,
      birthdate: birthdate ? birthdate.toISOString() : null,
      height,
      weight,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.continueButton, { opacity: isContinueEnabled ? 1 : 0.5 }]}
        disabled={!isContinueEnabled}
        onPress={navigateToRegister2}
      >
        <Text style={[styles.continueText, { color: isContinueEnabled ? '#7DB866' : '#ccc' }]}>Continuar</Text>
      </TouchableOpacity>

      <View style={styles.genderContainer}>
        <Ionicons name="person" size={24} color="#7DB866" style={styles.icon} />
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'male' && styles.selected]}
          onPress={() => handleSelectGender('male')}
        >
          <Text style={[styles.genderText, selectedGender === 'male' && styles.selectedText]}>Hombre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'female' && styles.selected]}
          onPress={() => handleSelectGender('female')}
        >
          <Text style={[styles.genderText, selectedGender === 'female' && styles.selectedText]}>Mujer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="resize" size={24} color="#7DB866" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Talla (cm)"
          onChangeText={setHeight}
          value={height}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="fitness" size={24} color="#7DB866" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          onChangeText={setWeight}
          value={weight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.dateContainer}>
        <Ionicons name="calendar" size={24} color="#7DB866" style={styles.calendarIcon} />
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{birthdate ? birthdate.toLocaleDateString() : 'Fecha de Nacimiento'}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={birthdate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      )}
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
    top: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '600',
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7DB866',
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  genderButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  selected: {
    backgroundColor: '#7DB866',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '7%',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '7%',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  calendarIcon: {
    marginRight: 10,
  },
  datePicker: {
    width: '100%',
    marginTop: 20,
  },
});

export default Register1;
