import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactHistory = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contact History</Text>
            <View style={styles.contentContainer}>
                <Image source={require('../assets/criminal2.jpg')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.titl}>GIGGLES, Nathan</Text>
                    <Text style={styles.title1}>Approx, 40, 5'10 Tall</Text>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title1}>April 5, 2024</Text>
                <Text style={styles.title1}>He was seen in a area of recent robbery.</Text>
                <Text style={styles.title1}>May 6, 2024</Text>
                <Text style={styles.title1}>He's been in contact with someone who has been involved in illegal activities.</Text>
                <Text style={styles.title1}>May 19, 2024</Text>
                <Text style={styles.title1}>He was trespassed by park security for aggressive nature and non-compliant behavior.</Text>
            </View>

            <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={30} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121A21',
        padding: 50,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 70,
        left: 10,
       
    },
    backButtonText: {
        color: '#121A21',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginVertical: 30,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
        marginLeft: -10,
    },
    title1: {
        color: "white",
        fontSize: 16,
        marginBottom: 20,
    },
    titl: {
        color: 'red',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    detailsContainer: {
        flex: 1,
    },
});

export default ContactHistory;


