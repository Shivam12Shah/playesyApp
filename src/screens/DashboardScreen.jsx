import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from '../api/Axios';
import UserHeader from '../components/Dashboard/UserHeader';
import QuickActions from '../components/Dashboard/QuickActions';
import UpcomingActivities from '../components/Dashboard/UpcomingActivities';
import Offers from '../components/Dashboard/Offers';
import RecentlyVisitedVenues from '../components/Dashboard/RecentlyVisitedVenues';
import VenuesNearYou from '../components/Dashboard/VenuesNearYou';
import AppHeader from '../components/AppHeader';

const mockUser = { name: 'Alex', playpals: 12, activities: 16 };
const mockActivities = [
  { id: 1, name: 'Sun Play Sports Academy', date: '06 Aug - 5:00 PM', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Letz Play Paper...', date: '07 Aug - 6:00 PM', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Letz Play Paper...', date: '07 Aug - 6:00 PM', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
];
const mockOffers = [
  { id: 1, title: 'Letz Play', description: '25% Off on swimming', coupon: 'SWIM25', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e4c47?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'VV Badminton', description: '50% Off on badminton', coupon: 'VVEBAD', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'VV Badminton', description: '50% Off on badminton', coupon: 'VVEBAD', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
];
const mockVisitedVenues = [
  { id: 1, name: 'Kittur Rani Chennamma Sports Stadium', location: 'Ullal', price: '₹200 per hour', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Sun Play Sports Academy', location: 'JP Nagar', price: '₹250 per hour', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80' },
];
const mockVenuesNearYou = [
  { id: 1, name: 'Kittur Rani Chennamma Sports Stadium', location: 'Mallathahalli (1.4 km)', price: '₹200 per person', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Letz Play Sports', location: 'Banashankari (2.1 km)', price: '₹180 per person', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e4c47?auto=format&fit=crop&w=400&q=80' },
];
const mockDates = ['Aug, 05', 'Aug, 06', 'Aug, 07'];

const DashboardScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await Axios.get('/api/user/dashboard');
        console.log("Dashboard API Response:", response.data);
        // You can set this data to state here and display it in your UI
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const [selectedDate, setSelectedDate] = React.useState(mockDates[0]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        {/* <UserHeader user={mockUser} /> */}
        <AppHeader/>
        <QuickActions onAction={(key) => {}} />
        <UpcomingActivities activities={mockActivities} />
        <Offers offers={mockOffers} />
        <RecentlyVisitedVenues venues={mockVisitedVenues} />
        <VenuesNearYou venues={mockVenuesNearYou} dates={mockDates} selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingy: 16 },
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
