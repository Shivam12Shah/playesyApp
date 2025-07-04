import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const venues = [
  { name: 'Tennis Court', distance: '1.2 miles away', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' }},
  { name: 'Basketball Court', distance: '2.5 miles away', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' }},
  { name: 'Soccer Field', distance: '3.1 mi', img: { uri: 'https://media.istockphoto.com/id/1295248329/photo/beautiful-young-black-boy-training-on-the-football-pitch.jpg?s=612x612&w=0&k=20&c=ws4m_NoSF8fRZGNoq5kVlJSfNghREKihaxsOBXAHOw8=' }},
];

const DashboardScreen = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.greeting}>Hi, Alex</Text>
      <Text style={styles.section}>Nearby</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {venues.map((venue, idx) => (
          <View key={idx} style={styles.venueCard}>
            <Image source={venue.img} style={styles.venueImg} />
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.venueDistance}>{venue.distance}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.section}>Quick Book</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {venues.map((venue, idx) => (
          <TouchableOpacity key={idx} style={styles.quickBookCard}>
            <Image source={venue.img} style={styles.venueImg} />
            <Text style={styles.venueName}>{venue.name}</Text>
            <Text style={styles.quickBookText}>Book a court</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.section}>Trending</Text>
      <View style={styles.trendingRow}>
        <Text style={styles.trendingItem}>Sports</Text>
        <Text style={styles.trendingItem}>Events</Text>
      </View>
      <Text style={styles.section}>Offers</Text>
      <View style={styles.offerCard}>
        <Text style={styles.offerText}>Limited Time</Text>
        <Text style={styles.offerTitle}>20% off on all court bookings</Text>
        <TouchableOpacity style={styles.bookNowBtn}><Text style={styles.bookNowText}>Book Now</Text></TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '600', color: '#888', marginBottom: 8 },
  greeting: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  section: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  horizontalScroll: { marginBottom: 8 },
  venueCard: { width: 140, marginRight: 12, backgroundColor: '#f5f5f5', borderRadius: 10, padding: 8, alignItems: 'center' },
  venueImg: { width: 120, height: 80, borderRadius: 8, marginBottom: 6 },
  venueName: { fontWeight: '600', fontSize: 15 },
  venueDistance: { color: '#888', fontSize: 12 },
  quickBookCard: { width: 140, marginRight: 12, backgroundColor: '#e6eaff', borderRadius: 10, padding: 8, alignItems: 'center' },
  quickBookText: { color: '#5B5BD6', fontWeight: '600', marginTop: 4 },
  trendingRow: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  trendingItem: { backgroundColor: '#eee', borderRadius: 8, padding: 8, marginRight: 8 },
  offerCard: { backgroundColor: '#e6eaff', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  offerText: { color: '#5B5BD6', fontWeight: '600' },
  offerTitle: { fontSize: 16, fontWeight: '700', marginVertical: 8 },
  bookNowBtn: { backgroundColor: '#5B5BD6', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24 },
  bookNowText: { color: '#fff', fontWeight: '600' },
});

export default DashboardScreen;
