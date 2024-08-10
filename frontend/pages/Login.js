import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === 'user' && password === 'pass') {
      Alert.alert('Login Successful');
      navigation.navigate('Home'); 
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.backgroundContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={require('../assets/facialrecognition.webp')} style={styles.backgroundImage} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Image source={require('../assets/asis_transparent.png')} style={styles.logo} />
          </View>
          <Text style={styles.title}>Log in</Text>
          <TextInput
            style={styles.input}
            placeholder="Officer Name"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#6c757d"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#6c757d"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1, // Take up the entire screen
    backgroundColor: '#f8f9fa', // Set the background color to a light gray
    justifyContent: 'center', // Center the container vertically
    alignItems: 'center', // Center the container horizontally
  },
  container: {
    flexDirection: 'row', // Arrange children in a row
    width: '40%', // Set the width of the container to 40% of the screen width
    height: '50%', // Set the height of the container to 50% of the screen height
    backgroundColor: '#fff', // Set the background color to white
    borderRadius: 10, // Round the corners of the container
    overflow: 'hidden', // Ensure child elements are clipped to the container
    shadowColor: '#000', // Set the shadow color to black
    shadowOffset: { width: 0, height: 2 }, // Set the shadow offset
    shadowOpacity: 0.25, // Set the shadow opacity
    shadowRadius: 3.84, // Set the shadow radius
    elevation: 5, // Add elevation to create a drop shadow (Android)
  },
  leftContainer: {
    flex: 1, // Take up equal space as the right container
    justifyContent: 'center', // Center contents vertically
    alignItems: 'center', // Center contents horizontally
    padding: 20, // Add padding inside the container
    position: 'relative', // Position children relative to this container
  },
  rightContainer: {
    flex: 1, // Take up equal space as the left container
    padding: 20, // Add padding inside the container
    justifyContent: 'center', // Center contents vertically
    alignItems: 'center', // Center contents horizontally
  },
  backgroundImage: {
    width: '100%', // Make the image as wide as the container
    height: '100%', // Make the image as tall as the container
    position: 'absolute', // Position the image absolutely within the container
    top: 0, // Align the top of the image with the top of the container
    left: 0, // Align the left of the image with the left of the container
    zIndex: -1, // Place the image behind other elements
  },
  welcomeContainer: {
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center contents vertically
    marginBottom: -30, // Add space below the welcome container
  },
  welcomeText: {
    fontSize: 22, // Set the font size of the welcome text
    color: '#343a40', // Set the text color to dark gray
    fontWeight: 'bold', // Make the text bold
    marginRight: 0, // Add space between the text and the logo
  },
  logo: {
    height: 100, // Set the height of the logo
    width: 80, // Set the width of the logo
    resizeMode: 'contain', // Contain the logo within the specified dimensions
  },
  title: {
    fontSize: 24, // Set the font size of the title
    color: '#343a40', // Set the text color to dark gray
    marginBottom: 20, // Add space below the title
    textAlign: 'center', // Center the text horizontally
    fontWeight: 'bold', // Make the text bold
  },
  input: {
    width: '100%', // Make the input field as wide as its container
    height: 40, // Set the height of the input field
    borderColor: '#ced4da', // Set the border color to light gray
    borderWidth: 1, // Set the border width
    marginBottom: 10, // Add space below the input field
    paddingLeft: 10, // Add padding to the left of the input field
    backgroundColor: '#fff', // Set the background color to white
    color: '#495057', // Set the text color to dark gray
    borderRadius: 5, // Round the corners of the input field
  },
  button: {
    width: '100%', // Make the button as wide as its container
    height: 40, // Set the height of the button
    backgroundColor: '#007bff', // Set the background color to blue
    justifyContent: 'center', // Center contents vertically
    alignItems: 'center', // Center contents horizontally
    borderRadius: 5, // Round the corners of the button
    marginTop: 20, // Add space above the button
  },
  buttonText: {
    color: '#fff', // Set the text color to white
    fontSize: 18, // Set the font size of the button text
    fontWeight: 'bold', // Make the button text bold
  },
});

export default Login;
