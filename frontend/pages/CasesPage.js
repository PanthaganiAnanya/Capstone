import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CasePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateCasePress = () => {
    setModalVisible(true);
  };

  const handleConfirmCreateCase = () => {
    setModalVisible(false);
    navigation.navigate('CreateCasePage');
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.backgroundContainer}
      keyboardShouldPersistTaps='handled'
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={require('../assets/casefile.webp')} style={styles.logo} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>Search or Create Case</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('SearchCasePage')}>
            <Text style={styles.buttonText}>Search Case</Text>
            <Icon name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleCreateCasePress}>
            <Text style={styles.buttonText}>Create Case</Text>
            <Icon name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#000000" /> {/* Changed color to black */}
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to generate a new case number?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleConfirmCreateCase}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: '60%', // Adjusted to ensure better responsiveness and smaller size
    height: '50%', // Adjusted height for smaller size
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
  title: {
    fontSize: 20, // Adjusted font size for smaller container
    color: '#343a40',
    fontWeight: 'bold',
    marginBottom: 20,
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
    fontSize: 14, // Adjusted font size for smaller container
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 50, // Adjusted position for smaller container
    left: 20, 
    padding: 10, 
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '30%', // Made the modal box smaller
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    width: '100%',
  },
  modalButton: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default CasePage;
