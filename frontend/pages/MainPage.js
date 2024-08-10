import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainPage = () => {
  const navigation = useNavigation();
  const [cases, setCases] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchRecentCases = async () => {
      try {
        const response = await fetch('http://localhost:3001/criminals');
        const data = await response.json();
        setCases(data);
      } catch (error) {
        console.error('Error fetching recent cases:', error);
      }
    };

    fetchRecentCases();

    // Set the alert
    setAlert({
      title: 'EMERGENCY ALERT',
      details: 'Strathmore RCMP have issued a Dangerous Person alert. Two armed and extremely dangerous suspects are in the area of Highway 564 and Range Road 252. Shelter in place if you are in the area.',
      instructions: 'Do not answer your door. Do not pick up strangers. Call 911 if you need help or have information.',
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/asis.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search records</Text>
            <View style={styles.searchOptions}>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryCases', { category: 'BOLO' })}>
                <Text style={styles.searchOption}><Icon name="exclamation-triangle" size={20} color="#FFD700" /> BOLO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryCases', { category: 'TRESPASS' })}>
                <Text style={styles.searchOption}><Icon name="ban" size={20} color="#FF6347" /> Trespass</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryCases', { category: 'WANTED' })}>
                <Text style={styles.searchOption}><Icon name="user-secret" size={20} color="#1E90FF" /> Wanted</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryCases', { category: 'HISTORY' })}>
                <Text style={styles.searchOption}><Icon name="history" size={20} color="#32CD32" /> Contact History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.alertSection}>
            <Text style={styles.sectionTitle}>Alerts</Text>
            {alert ? (
              <View style={styles.alertContainer}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertDetails}>{alert.details}</Text>
                <Text style={styles.alertInstructions}>{alert.instructions}</Text>
              </View>
            ) : (
              <Text>No alerts at the moment.</Text>
            )}
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Cases</Text>
            <ScrollView style={styles.casesContainer} contentContainerStyle={styles.casesContentContainer}>
              {cases.map((criminalCase) => (
                <View key={criminalCase.caseNumber} style={styles.case}>
                  <TouchableOpacity style={styles.caseButton} onPress={() => navigation.navigate('CaseDetails', { caseNumber: criminalCase.caseNumber })}>
                    <Icon name="arrow-right" size={20} color="#1E90FF" />
                  </TouchableOpacity>
                  <View style={styles.caseDetails}>
                    <Text style={styles.caseText}>Case {criminalCase.caseNumber}: {criminalCase.crime}</Text>
                    <Text style={styles.caseSubText}>Officer Unit: {criminalCase.officerUnit}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 50,
    marginRight: 10,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#121A21',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
  },
  rightContainer: {
    flex: 2,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1, // Ensure section takes available space
  },
  alertSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchOptions: {
    marginLeft: 10,
  },
  searchOption: {
    fontSize: 16,
    marginBottom: 10,
  },
  casesContainer: {
    flex: 1,
  },
  casesContentContainer: {
    paddingBottom: 20,
  },
  case: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  caseButton: {
    padding: 10,
    marginRight: 15,
  },
  caseDetails: {
    flex: 1,
  },
  caseText: {
    color: '#121A21',
    fontSize: 16,
    fontWeight: 'bold',
  },
  caseSubText: {
    color: '#6C7883',
    fontSize: 14,
  },
  alertContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#ffcccc',
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc0000',
    marginBottom: 10,
  },
  alertDetails: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  alertInstructions: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default MainPage;
