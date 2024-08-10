import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing user data)
    // Then navigate back to the Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back if the user cancels logout
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Are you sure you want to logout?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '40%',
    backgroundColor: '#e9ecef', // Greyish container
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#343a40',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    padding: 15,
    margin: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
