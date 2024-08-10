import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BOLO = () => {
    const navigation = useNavigation();
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await fetch('http://localhost:3001/criminals/category/BOLO');
                const data = await response.json();
                setCases(data);
            } catch (error) {
                console.error('Error fetching BOLO cases:', error);
            }
        };

        fetchCases();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-left" size={30} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.title}>BOLO Cases</Text>
            <View style={styles.contentContainer}>
                <ScrollView>
                    {cases.map(criminalCase => (
                        <View key={criminalCase._id} style={styles.caseContainer}>
                            <Text style={styles.caseTitle}>Case Number: {criminalCase.caseNumber}</Text>
                            <Text style={styles.caseInfo}>Officer Unit: {criminalCase.officerUnit}</Text>
                            <Text style={styles.caseInfo}>Suspect Name: {criminalCase.name}</Text>
                            <Text style={styles.caseInfo}>Crime: {criminalCase.crime}</Text>
                            <Text style={styles.caseDescription}>Description: {criminalCase.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        paddingTop: 40,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },
    title: {
        fontSize: 24,
        color: '#121A21',
        textAlign: 'center',
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    caseContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: '#E0E7EC',
        borderWidth: 1,
    },
    caseTitle: {
        fontSize: 18,
        color: '#121A21',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    caseInfo: {
        fontSize: 16,
        color: '#121A21',
        marginBottom: 5,
    },
    caseDescription: {
        fontSize: 16,
        color: '#121A21',
        marginTop: 10,
    },
});

export default BOLO;
