import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TrespassRecords = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trespass Records</Text>
            <View style={styles.contentContainer}>
                <Image source={require('../assets/criminal2.jpg')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title1}>GIGGLES, Nathan</Text>
                    <Text style={styles.title2}>Approx, 40, 5'10 Tall</Text>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title1}>Case #</Text>
                <Text style={styles.title2}>CA20242071</Text>
                <Text style={styles.title2}>Unit 1371</Text>
                <Text style={styles.title1}>Location</Text>
                <Text style={styles.title2}>231 10th ave Downtown Calgary, AB, Canada</Text>
                <Text style={styles.title1}>Description</Text>
                <Text style={styles.title2}>Caucasian Male, approx. 5'10", slim build, short buzz cut, black hair, grey eyes color</Text>
                <Text style={styles.title1}>DOB/Age</Text>
                <Text style={styles.title2}>Approx, 40</Text>
                <Text style={styles.title1}>Reason for Trespass</Text>
                <Text style={styles.title2}>Break and Enter</Text>
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
        top: 30,
        left: 10,
        padding: 10,
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
    },
    title1: {
        color: "#FF0000",
        fontSize: 20,
        marginBottom: 5,
    },
    title2: {
        color: "white",
        fontSize: 16,
        marginBottom: 15,
    },
    detailsContainer: {
        flex: 1,
    },
});

export default TrespassRecords;
