import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Register3 = ({ navigation, route }) => {
  const {
    selectedActivity,
    selectedGender,
    birthdate,
    height,
    weight,
    activityLevel,
  } = route.params;

  const [allergies, setAllergies] = useState('');
  const [allergyList, setAllergyList] = useState([]);
  const [dislikes, setDislikes] = useState('');
  const [dislikeList, setDislikeList] = useState([]);

  const handleAllergyInputChange = (text) => {
    setAllergies(text);
  };

  const handleAddAllergy = () => {
    if (allergies.trim() !== '') {
      setAllergyList([...allergyList, allergies.trim()]);
      setAllergies('');
    }
  };

  const handleRemoveAllergy = (index) => {
    const newList = [...allergyList];
    newList.splice(index, 1);
    setAllergyList(newList);
  };

  const handleDislikeInputChange = (text) => {
    setDislikes(text);
  };

  const handleAddDislike = () => {
    if (dislikes.trim() !== '') {
      setDislikeList([...dislikeList, dislikes.trim()]);
      setDislikes('');
    }
  };

  const handleRemoveDislike = (index) => {
    const newList = [...dislikeList];
    newList.splice(index, 1);
    setDislikeList(newList);
  };

  const handleContinue = () => {
    navigation.navigate('Register4', {
      selectedActivity,
      selectedGender,
      birthdate,
      height,
      weight,
      activityLevel,
      allergies: allergyList,
      dislikes: dislikeList,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#7DB866" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { marginTop: 20 }]}>¿A qué eres alérgico?</Text>
        <View style={styles.tagContainer}>
          {allergyList.map((item, index) => (
            <TouchableOpacity key={index} style={styles.tagButton} onPress={() => handleRemoveAllergy(index)}>
              <Text style={styles.tagText}>{item} <Ionicons name="close" size={12} color="#FFFFFF" /></Text>
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Escribe una alergia y presiona espacio"
            value={allergies}
            onChangeText={handleAllergyInputChange}
            onSubmitEditing={handleAddAllergy}
          />
        </View>

        <Text style={[styles.title, { marginTop: 20 }]}>¿Qué alimentos no te gustan?</Text>
        <View style={styles.tagContainer}>
          {dislikeList.map((item, index) => (
            <TouchableOpacity key={index} style={styles.tagButton} onPress={() => handleRemoveDislike(index)}>
              <Text style={styles.tagText}>{item} <Ionicons name="close" size={12} color="#FFFFFF" /></Text>
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Escribe un alimento y presiona espacio"
            value={dislikes}
            onChangeText={handleDislikeInputChange}
            onSubmitEditing={handleAddDislike}
          />
        </View>

        {/* Botón Continuar */}
        <TouchableOpacity
          style={[styles.continueButton]}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continuar</Text>
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
  continueButton: {
    position: 'absolute',
    top: 15,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7DB866',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#7DB866',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
  },
  tagButton: {
    backgroundColor: '#7DB866',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 5,
  },
});

export default Register3;
