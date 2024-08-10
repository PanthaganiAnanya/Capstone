import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreateCasePage = ({ navigation }) => {
  const [caseNumber, setCaseNumber] = useState('');
  const [officerNameUnit, setOfficerNameUnit] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [suspectName, setSuspectName] = useState('');
  const [photo, setPhoto] = useState('');
  const [age, setAge] = useState('');
  const [crime, setCrime] = useState('');
  const [category, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isOfficerNameUnitEmpty, setIsOfficerNameUnitEmpty] = useState(false);
  const [isCaseDescriptionEmpty, setIsCaseDescriptionEmpty] = useState(false);
  const [isSuspectNameEmpty, setIsSuspectNameEmpty] = useState(false);
  const [isPhotoEmpty, setIsPhotoEmpty] = useState(false);
  const [isAgeEmpty, setIsAgeEmpty] = useState(false);
  const [isCrimeEmpty, setIsCrimeEmpty] = useState(false);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);

  useEffect(() => {
    const getLastCaseNumber = async () => {
      try {
        const lastCaseNumber = await AsyncStorage.getItem('lastCaseNumber');
        if (lastCaseNumber !== null) {
          setCaseNumber((parseInt(lastCaseNumber, 10) + 1).toString());
        } else {
          setCaseNumber('10000000'); // Start from 10000000 if no case number is found
        }
      } catch (error) {
        console.error('Error fetching last case number:', error);
      }
    };
    getLastCaseNumber();
  }, []);

  const handleCreateCase = async () => {
    setIsOfficerNameUnitEmpty(!officerNameUnit);
    setIsCaseDescriptionEmpty(!caseDescription);
    setIsSuspectNameEmpty(!suspectName);
    setIsPhotoEmpty(!photo);
    setIsAgeEmpty(!age);
    setIsCrimeEmpty(!crime);
    setIsCategoryEmpty(!category);

    if (!officerNameUnit || !caseDescription || !suspectName || !photo || !age || !crime || !category) {
      return;
    }

    const newCase = {
      caseNumber,
      officerUnit: officerNameUnit,
      otherDetails: caseDescription,
      name: suspectName,
      photo,
      age,
      crime,
      category
    };

    try {
      const response = await fetch('http://localhost:3001/criminals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCase),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        // Save the new case number as the last case number
        await AsyncStorage.setItem('lastCaseNumber', caseNumber);
        // Optionally clear the input fields
        setOfficerNameUnit('');
        setCaseDescription('');
        setSuspectName('');
        setPhoto('');
        setAge('');
        setCrime('');
        setCategory('');
        setCaseNumber((parseInt(caseNumber, 10) + 1).toString()); // Increment for next case
      } else {
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setSuccessMessage('Error creating case.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.backgroundContainer}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={require('../assets/createcase.jpeg')} style={styles.backgroundImage} />
            <Text style={styles.welcomeText}>Create a new case file</Text>
          </View>
          <View style={styles.rightContainer}>
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={caseNumber}
              placeholder="Case Number"
              editable={false}
              placeholderTextColor="#9EABB8"
            />
            <TextInput
              style={[styles.input, isOfficerNameUnitEmpty && styles.errorInput]}
              onChangeText={(text) => { setOfficerNameUnit(text); setIsOfficerNameUnitEmpty(false); }}
              value={officerNameUnit}
              placeholder="Officer unit"
              keyboardType="default"
              placeholderTextColor="#9EABB8"
            />
            <TextInput
              style={[styles.input, isSuspectNameEmpty && styles.errorInput]}
              onChangeText={(text) => { setSuspectName(text); setIsSuspectNameEmpty(false); }}
              value={suspectName}
              placeholder="Suspect Name"
              keyboardType="default"
              placeholderTextColor="#9EABB8"
            />
            <TextInput
              style={[styles.input, isPhotoEmpty && styles.errorInput]}
              onChangeText={(text) => { setPhoto(text); setIsPhotoEmpty(false); }}
              value={photo}
              placeholder="Photo URL"
              keyboardType="default"
              placeholderTextColor="#9EABB8"
            />
            <TextInput
              style={[styles.input, isAgeEmpty && styles.errorInput]}
              onChangeText={(text) => { setAge(text); setIsAgeEmpty(false); }}
              value={age}
              placeholder="Age"
              keyboardType="numeric"
              placeholderTextColor="#9EABB8"
            />
            <TextInput
              style={[styles.input, isCrimeEmpty && styles.errorInput]}
              onChangeText={(text) => { setCrime(text); setIsCrimeEmpty(false); }}
              value={crime}
              placeholder="Crime"
              keyboardType="default"
              placeholderTextColor="#9EABB8"
            />
            <TextInput
              style={[styles.input, isCategoryEmpty && styles.errorInput]}
              onChangeText={(text) => { setCategory(text); setIsCategoryEmpty(false); }}
              value={category}
              placeholder="Category (e.g., BOLO, TRESPASS)"
              keyboardType="default"
              placeholderTextColor="#9EABB8"
            />
            <TextInput
              style={[styles.input, styles.descriptionInput, isCaseDescriptionEmpty && styles.errorInput]}
              onChangeText={(text) => { setCaseDescription(text); setIsCaseDescriptionEmpty(false); }}
              value={caseDescription}
              placeholder="Case description"
              multiline
              numberOfLines={4}
              placeholderTextColor="#9EABB8"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateCase}
            >
              <Text style={styles.buttonText}>Create Case File</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#000000" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flexGrow: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f8f9fa',
  },
  container: {
    flexDirection: 'row',
    width: '60%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContainer: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    width: '100%', 
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#243647',
    color: '#FFFFFF',
    borderRadius: 5,
  },
  descriptionInput: {
    height: 100,
  },
  disabledInput: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
  },
  button: {
    width: '100%', 
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 28, // Increased font size
    color: '#ffffff', // Changed text color to white
    fontWeight: 'bold',
    position: 'absolute', // Ensure the text is positioned over the image
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Added text shadow for better visibility
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginBottom: 20,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 2,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    resizeMode: 'cover',
  },
});

export default CreateCasePage;
