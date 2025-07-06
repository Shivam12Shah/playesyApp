import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const VenuesNearYou = ({ venues, onDateSelect, selectedDate, dates }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Venues near you</Text>
    <View style={styles.datesRow}>
      {dates.map((date) => (
        <TouchableOpacity
          key={date}
          style={[styles.dateButton, selectedDate === date && styles.selectedDate]}
          onPress={() => onDateSelect(date)}
        >
          <Text style={styles.dateText}>{date}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <FlatList
      data={venues}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.venueBox}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.venueName}>{item.name}</Text>
          <Text style={styles.venueLocation}>{item.location}</Text>
          <Text style={styles.venuePrice}>{item.price}</Text>
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 8 , paddingHorizontal: 12 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  datesRow: { flexDirection: 'row', marginBottom: 8 , color:"white"},
  dateButton: { backgroundColor: '#4A55A1', padding: 8, borderRadius: 8, marginRight: 8 },
  selectedDate: { backgroundColor: '#4A55A1' },
  dateText: { color: 'white', fontSize: 12 },
  venueBox: { backgroundColor: '#fff', padding: 8, borderRadius: 8, minWidth: 180, marginRight: 16, marginVertical: 4 },
  image: { width: '100%', height: 160, borderRadius: 8, marginBottom: 4 },
  venueName: { fontWeight: 'bold', fontSize: 14 },
  venueLocation: { color: '#888', fontSize: 12 },
  venuePrice: { color: '#4A55A1', fontSize: 12, marginTop: 4 },
});

export default VenuesNearYou;
