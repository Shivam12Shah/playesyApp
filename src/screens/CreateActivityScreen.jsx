import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateActivityScreen = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
            <Text style={styles.title}>Create Activity</Text>
            <Text style={styles.label}>Sport</Text>
            <TextInput style={styles.input} placeholder="Pickleball" />
            <Text style={styles.label}>Date & Time</Text>
            <TextInput style={styles.input} placeholder="Today, 6:00 PM" />
            <Text style={styles.label}>Venue</Text>
            <TextInput style={styles.input} placeholder="Central Park Courts" />
            <Text style={styles.label}>Invite Friends</Text>
            <TouchableOpacity style={styles.inviteBtn}><Text style={styles.inviteText}>Invite Friends</Text></TouchableOpacity>
            <Text style={styles.label}>Max Players</Text>
            <TextInput style={styles.input} placeholder="4" keyboardType="numeric" />
            <Text style={styles.label}>Payment Split</Text>
            <TouchableOpacity style={styles.inviteBtn}><Text style={styles.inviteText}>Split Evenly</Text></TouchableOpacity>
            <TouchableOpacity style={styles.createBtn}><Text style={styles.createBtnText}>Create Activity</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 24 },
    title: { fontSize: 22, fontWeight: '600', color: '#888', marginBottom: 16 },
    label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 8 },
    inviteBtn: { backgroundColor: '#eee', borderRadius: 8, padding: 10, marginBottom: 8 },
    inviteText: { color: '#5B5BD6', fontWeight: '600' },
    createBtn: { backgroundColor: '#5B5BD6', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
    createBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default CreateActivityScreen;
