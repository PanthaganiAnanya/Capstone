import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EvidencePage = ({ navigation }) => {
  return (
    <ScrollView 
      contentContainerStyle={styles.backgroundContainer}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={require('../assets/evidence.webp')} style={styles.backgroundImage} />
          <Text style={styles.welcomeText}>Evidence</Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.evidenceContainer}>
            <View style={styles.evidenceDetails}>
              <Text style={styles.caseText}>Case 100000008: Knife</Text>
              <Text style={styles.officerUnitText}>Evidence: Subject 99</Text>
            </View>
            <View style={styles.evidenceDetails}>
              <Text style={styles.caseText}>Case 100000006: Firearm</Text>
              <Text style={styles.officerUnitText}>Evidence: Subject 101</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEvidencePage')}>
            <Text style={styles.buttonText}>Add Evidence</Text>
          </TouchableOpacity>
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
    width: '60%',
    height: '50%',
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
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute', // Ensure the text is positioned over the image
    color: '#ffffff', // White text for better visibility
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Added text shadow for better visibility
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  instructions: {
    fontSize: 20,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
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
  button: {
    width: '80%', 
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
  evidenceContainer: {
    width: '80%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  evidenceDetails: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  caseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  officerUnitText: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default EvidencePage;
