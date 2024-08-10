import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchCasePage = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [officerUnit, setOfficerUnit] = useState('');
  const [caseData, setCaseData] = useState(null);
  const navigation = useNavigation();

  const searchCase = () => {
    fetch(`http://localhost:3001/criminals/search?caseNumber=${caseNumber}&officerUnit=${officerUnit}`)
      .then(response => response.json())
      .then(data => setCaseData(data))
      .catch(error => console.error('Error fetching case:', error));
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.backgroundContainer}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>Search Case</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Case Number"
            value={caseNumber}
            onChangeText={setCaseNumber}
            placeholderTextColor="#6c757d"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Officer Unit #"
            value={officerUnit}
            onChangeText={setOfficerUnit}
            placeholderTextColor="#6c757d"
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={searchCase}
          >
            <Text style={styles.buttonText}>SEARCH</Text>
            <Icon name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
          {caseData && (
            <View style={styles.caseDetails}>
              <Text style={styles.caseText}>Case Number: {caseData.caseNumber}</Text>
              <Text style={styles.caseText}>Officer Unit: {caseData.officerUnit}</Text>
              <Text style={styles.caseText}>Name: {caseData.name}</Text>
              <Text style={styles.caseText}>Age: {caseData.age}</Text>
              <Text style={styles.caseText}>Crime: {caseData.crime}</Text>
              <Text style={styles.caseText}>Category: {caseData.category}</Text>
              <Text style={styles.caseText}>Other Details: {caseData.otherDetails}</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#000000" />
      </TouchableOpacity>
    </ScrollView>
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
    width: '30%', // Adjusted to ensure better responsiveness and smaller size
    height: 'auto', // Adjusted height for smaller size
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 50, // Ensuring some space from the top
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#343a40',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#243647',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
    width: '100%',
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  caseDetails: {
    marginTop: 20,
    backgroundColor: '#243647',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  caseText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
});

export default SearchCasePage;
