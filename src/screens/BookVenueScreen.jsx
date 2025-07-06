import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';

const venues = [
    { name: 'Central Park Tennis Courts', courts: '4 courts available', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
    { name: 'City Gym Basketball Court', courts: '2 courts available', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
    { name: 'Riverside Soccer Field', courts: '1 field available', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
];

const BookVenueScreen = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <AppHeader />
        <View style={styles.container}>
            <Text style={styles.title}>Book a venue</Text>
            <TextInput style={styles.search} placeholder="Search" />
            <FlatList
                data={venues}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <View style={styles.venueCard}>
                        <Image source={item.img} style={styles.venueImg} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.venueName}>{item.name}</Text>
                            <Text style={styles.venueCourts}>{item.courts}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookBtn}><Text style={styles.bookBtnText}>Book</Text></TouchableOpacity>
                    </View>
                )}
            />
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    title: { fontSize: 22, fontWeight: '600', color: '#888', marginBottom: 8 },
    search: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16 },
    venueCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, padding: 8, marginBottom: 12 },
    venueImg: { width: 80, height: 60, borderRadius: 8, marginRight: 12 },
    venueName: { fontWeight: '600', fontSize: 15 },
    venueCourts: { color: '#888', fontSize: 12 },
    bookBtn: { backgroundColor: '#5B5BD6', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
    bookBtnText: { color: '#fff', fontWeight: '600' },
});

export default BookVenueScreen;
