import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const Offers = ({ offers }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Offers</Text>
    <FlatList
      data={offers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.offerBox}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDesc}>{item.description}</Text>
          <Text style={styles.coupon}>Coupon: {item.coupon}</Text>
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
  offerBox: { backgroundColor: '#E2E5F9', padding: 4, borderRadius: 8, marginRight: 8, minWidth: 180 ,boxShadow:'0 2px 4px rgba(0,0,0,0.1)', marginVertical: 4 },
  offerTitle: { fontWeight: 'bold', fontSize: 14 },
  offerDesc: { color: '#888', fontSize: 12 },
  coupon: { color: '#4A55A1', fontSize: 12, marginTop: 4 },
  image: { width: '100%', height: 70, borderRadius: 4, marginBottom: 6, alignSelf: 'center' },
});

export default Offers;
