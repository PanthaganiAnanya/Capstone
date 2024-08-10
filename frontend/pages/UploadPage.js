import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { saveAs } from 'file-saver';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const UploadPicturePage = ({ navigation }) => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  // Handle choosing a file from documents
  const handleChooseFromDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ['image/*'], });
      if (result.type === 'success') {
        setSelectedFile(result);
        setSelectedImageUri(result.uri);
        Alert.alert('File Selected', `File name: ${result.name}`);
      } else {
        console.log('File selection cancelled.');
      }
    } catch (err) {
      console.log('Error selecting document: ', err);
      Alert.alert('Error', 'Failed to select document.');
    }
  };

  // Handle taking a photo from the camera
  const handleTakePhotoFromCamera = (dataUri) => {
    setImageData(dataUri);
    setPhotoBlob(dataUriToBlob(dataUri));
    setIsCameraVisible(false);
  };

  // Convert Data URI to Blob
  const dataUriToBlob = (dataUri) => {
    const byteString = atob(dataUri.split(',')[1]);
    const mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Handle saving the image
  const handleSaveImage = () => {
    if (photoBlob) {
      saveAs(photoBlob, 'captured-image.png');
    } else {
      Alert.alert('No Image', 'There is no image to save.');
    }
  };

  // Handle retaking the photo
  const handleRetakePhoto = () => {
    setImageData(null);
    setPhotoBlob(null);
    setIsCameraVisible(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.backgroundContainer}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={require('../assets/Crime-Scene.webp')} style={styles.logo} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.welcomeText}>Upload a Picture</Text>
          <Text style={styles.instructions}>
            Please upload a clear, high-resolution image of the suspect. Make sure the photo is taken with
            good lighting and avoid reflections on the face.
          </Text>
          {!isCameraVisible && (
            <>
              <TouchableOpacity 
                style={styles.button}
                onPress={handleChooseFromDocuments}
              >
                <Text style={styles.buttonText}>Choose from Documents</Text>
                <Icon name="arrow-right" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setIsCameraVisible(true)}
              >
                <Text style={styles.buttonText}>Take Photo</Text>
                <Icon name="arrow-right" size={20} color="white" />
              </TouchableOpacity>
            </>
          )}
          {isCameraVisible && (
            <View style={styles.cameraContainer}>
              <Camera
                onTakePhoto={handleTakePhotoFromCamera}
                //idealFacingMode="ENVIRONMENT"
                isFullscreen={false}
                isImageMirror={false}
                imageType="png"
                isSilentMode={false}
                idealResolution={{ width: 1280, height: 720 }}
              />
            </View>
          )}
          {imageData && (
            <View style={styles.fileContainer}>
              <Image source={{ uri: imageData }} style={styles.previewImage} />
              <TouchableOpacity style={styles.button} onPress={handleSaveImage}>
                <Text style={styles.buttonText}>Save Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <Text style={styles.buttonText}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          )}
          {selectedFile && (
            <View style={styles.fileContainer}>
              <Text style={styles.fileName}>Selected File: {selectedFile.name}</Text>
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
    width: viewportWidth * 0.9, 
    height: viewportHeight * 0.8, 
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
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 20,
    color: '#343a40',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 15,
    height: 40,
    width: '100%',
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    color: '#000000',
  },
  cameraContainer: {
    width: '100%',
    height: 450, 
    marginBottom: 20,
  },
  fileContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 240,
    marginBottom: 10,
    
  },
  fileName: {
    fontSize: 14,
    color: '#333',
  },
});

export default UploadPicturePage;


