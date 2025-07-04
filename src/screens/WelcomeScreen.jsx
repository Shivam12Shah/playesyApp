import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
            <Text style={styles.title}>Stitch Design</Text>
            <Image source={require('../../assets/community.png')} style={styles.image} />
            <Text style={styles.heading}>Find your community</Text>
            <Text style={styles.subheading}>Connect with people who share your interests and passions.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: '600', marginBottom: 16, color: '#888' },
    image: { width: 220, height: 180, marginBottom: 24, resizeMode: 'contain' },
    heading: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
    subheading: { fontSize: 16, color: '#666', marginBottom: 32, textAlign: 'center', paddingHorizontal: 32 },
    button: { backgroundColor: '#5B5BD6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default WelcomeScreen;
