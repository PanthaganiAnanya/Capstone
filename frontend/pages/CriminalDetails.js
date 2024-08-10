// pages/CriminalDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CriminalDetails = ({ route }) => {
  const { name } = route.params;
  const [criminal, setCriminal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/criminals/${name}`)
      .then(response => response.json())
      .then(data => setCriminal(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [name]);

  return (
    <View style={styles.container}>
      {criminal ? (
        <View>
          <Text>Name: {criminal.name}</Text>
          <Text>Crime: {criminal.crime}</Text>
          {/* Add more fields as necessary */}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121A21',
  },
});

export default CriminalDetails;
