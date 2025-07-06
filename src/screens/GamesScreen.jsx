import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import AppHeader from '../components/AppHeader';

const games = [
  { sport: 'Basketball', name: 'Pickup Basketball', players: '10 players · Intermediate', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
  { sport: 'Basketball', name: 'Basketball Practice', players: '5 players · Beginner', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
  { sport: 'Basketball', name: 'Basketball Tournament', players: '12 players · Advanced', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
  { sport: 'Soccer', name: 'Soccer Match', players: '14 players · Intermediate', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
  { sport: 'Soccer', name: 'Soccer Practice', players: '10 players · Beginner', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
  { sport: 'Soccer', name: 'Soccer Tournament', players: '16 players · Advanced', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' } },
];

const GamesScreen = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>
    <AppHeader />
      <Text style={styles.title}>Games</Text>
      <FlatList
        data={games}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.gameCard}>
            <Image source={item.img} style={styles.gameImg} />
            <View style={{ flex: 1 }}>
              <Text style={styles.gameName}>{item.name}</Text>
              <Text style={styles.gamePlayers}>{item.players}</Text>
            </View>
          </View>
        )}
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '600', color: '#888', marginBottom: 8 },
  gameCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, padding: 8, marginBottom: 12 },
  gameImg: { width: 80, height: 60, borderRadius: 8, marginRight: 12 },
  gameName: { fontWeight: '600', fontSize: 15 },
  gamePlayers: { color: '#888', fontSize: 12 },
});

export default GamesScreen;
