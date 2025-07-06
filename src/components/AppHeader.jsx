import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppHeader = ({ location = "Ullal RTO Office...", onBookmark, onNotification }) => (
  <View style={styles.headerRow}>
    <View style={styles.locationBox}>
        <Ionicons name="location-outline" style={styles.locationIcon} />
      <Text style={styles.locationText}>{location}</Text>
    </View>
    <View style={styles.iconRow}>
      <TouchableOpacity style={styles.iconBtn} onPress={onBookmark}>
        <Ionicons name="bookmark-outline" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn} onPress={onNotification}>
        <Ionicons name="notifications-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, backgroundColor: '#4A55A1', paddingHorizontal:8, paddingVertical: 16},
  locationBox: { flexDirection: 'row', alignItems: 'center' },
  locationIcon: { fontSize: 18, marginRight: 4 , color: 'white' },
  locationText: { fontSize: 15, fontWeight: '500', color: 'white', maxWidth: 160 },
  iconRow: { flexDirection: 'row' },
  iconBtn: { marginLeft: 12 },
  icon: { fontSize: 20 },
});

export default AppHeader;
