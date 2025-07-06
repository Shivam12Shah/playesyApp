import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../AppHeader';

const UserHeader = ({ user, location = "Ullal RTO Office..." }) => (
  <View style={styles.wrapper}>
    <AppHeader location={location} />
    <Text style={styles.greeting}>Hey, {user?.name || 'User'}</Text>
    <View style={styles.statsRow}>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{user?.playpals || 0}</Text>
        <Text style={styles.statLabel}>Playpals</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{user?.activities || 0}</Text>
        <Text style={styles.statLabel}>Activities</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {backgroundColor: '#fff' },
  greeting: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#388e3c' },
  statLabel: { fontSize: 12, color: '#888' },
});

export default UserHeader;
