// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

// const AllCases = () => {
//   const [cases, setCases] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/criminals')
//       .then(response => {
//         console.log('Response:', response);  // Add this line
//         return response.json();
//       })
//       .then(data => {
//         console.log('Data:', data);  // Add this line
//         setCases(data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const renderCase = ({ item }) => (
//     <View style={styles.caseContainer}>
//       <Image source={{ uri: item.photo }} style={styles.photo} />
//       <Text style={styles.text}>Name: {item.name}</Text>
//       <Text style={styles.text}>Age: {item.age}</Text>
//       <Text style={styles.text}>Crime: {item.crime}</Text>
//       <Text style={styles.text}>Category: {item.category}</Text>
//       <Text style={styles.text}>Details: {item.otherDetails}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={cases}
//         renderItem={renderCase}
//         keyExtractor={(item) => item.name}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#121A21',
//   },
//   caseContainer: {
//     marginBottom: 20,
//     padding: 15,
//     backgroundColor: '#1E2A38',
//     borderRadius: 10,
//   },
//   photo: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//     marginVertical: 5,
//   },
// });

// export default AllCases;
