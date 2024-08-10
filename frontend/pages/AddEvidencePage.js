import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddEvidencePage = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [file, setFile] = useState(null);
  const navigation = useNavigation();

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setFile(result);
        console.log('File selected:', result);
      } else {
        console.log('File selection cancelled');
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const handleSubmit = async () => {
    if (!file || !caseNumber) {
      Alert.alert('Error', 'Please select a file and enter a case number.');
      return;
    }

    const formData = new FormData();
    formData.append('caseNumber', caseNumber);
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'application/octet-stream',
    });

    try {
      const response = await fetch('http://localhost:3001/evidence', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Evidence added:', data);
        setCaseNumber('');
        setFile(null);
        Alert.alert('Success', 'Evidence added successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error adding evidence:', errorData);
        Alert.alert('Error', `Failed to add evidence: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding evidence:', error);
      Alert.alert('Error', 'Failed to add evidence.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#000000" />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Evidence</Text>
        <TextInput
          style={styles.input}
          placeholder="Case Number"
          value={caseNumber}
          onChangeText={setCaseNumber}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
          <Text style={styles.uploadButtonText}>Upload File</Text>
        </TouchableOpacity>
        <View style={styles.fileContainer}>
          <Text style={styles.fileName}>{file ? file.name : 'No file selected'}</Text>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>ADD EVIDENCE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fileContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  fileName: {
    color: '#333',
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddEvidencePage;
