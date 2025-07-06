import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const UpcomingActivities = ({ activities }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Upcoming activities</Text>
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <TouchableOpacity style={styles.directions}><Text style={styles.directionsText}>Get directions</Text></TouchableOpacity>
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 8 , paddingHorizontal: 8 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  item: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginRight: 8, minWidth: 180 , boxShadow:'0 2px 4px rgba(0,0,0,0.1)', marginVertical: 4 },
  name: { fontWeight: 'bold', fontSize: 14 },
  date: { color: '#888', fontSize: 12 },
  directions: { marginTop: 4 },
  directionsText: { color: '#4A55A1', fontSize: 12 },
  image: { width: '100%', height: 90, borderRadius: 4, marginBottom: 6, alignSelf: 'center' },
});

export default UpcomingActivities;
