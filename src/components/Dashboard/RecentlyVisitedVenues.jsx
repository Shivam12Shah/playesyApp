import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const RecentlyVisitedVenues = ({ venues }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Recently visited venues</Text>
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
  container: { marginVertical: 8, paddingHorizontal: 8 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  venueBox: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginRight: 8, minWidth: 180,boxShadow:'0 2px 4px rgba(0,0,0,0.1)', marginVertical: 4  },
  image: { width: '100%', height: 120, borderRadius: 4, marginBottom: 4 },
  venueName: { fontWeight: 'bold', fontSize: 14 },
  venueLocation: { color: '#888', fontSize: 12 },
  venuePrice: { color: '#4A55A1', fontSize: 12, marginTop: 4 },
});

export default RecentlyVisitedVenues;
