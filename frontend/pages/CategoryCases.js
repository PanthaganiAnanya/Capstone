import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryCases = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/criminals/category/${category}`)
      .then(response => response.json())
      .then(data => setCases(data))
      .catch(error => console.error('Error fetching cases:', error));
  }, [category]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{category} Cases</Text>
      <ScrollView style={styles.casesContainer}>
        {cases.map(criminalCase => (
          <View key={criminalCase._id} style={styles.case}>
            <Text style={styles.caseText}>Case Number: {criminalCase.caseNumber}</Text>
            <Text style={styles.caseText}>Officer Unit: {criminalCase.officerUnit}</Text>
            <Text style={styles.caseText}>Suspect Name: {criminalCase.name}</Text>
            <Text style={styles.caseText}>Crime: {criminalCase.crime}</Text>
            <Text style={styles.caseText}>Description: {criminalCase.otherDetails}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121A21',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  casesContainer: {
    flex: 1,
  },
  case: {
    backgroundColor: '#243647',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  caseText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CategoryCases;
