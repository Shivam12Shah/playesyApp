import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const actions = [
  { label: 'Create Activity', key: 'create' },
  { label: 'Quick Book', key: 'quickBook' },
  { label: 'Favorites Venues', key: 'favorites' },
  { label: 'Groups', key: 'groups' },
  { label: 'Offers', key: 'offers' },
];

const QuickActions = ({ onAction }) => (
  <View style={styles.row}>
    {actions.map((action) => (
      <TouchableOpacity
        key={action.key}
        style={styles.button}
        onPress={() => onAction(action.key)}
      >
        <Text style={styles.label}>{action.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8, paddingHorizontal: 8 },
  button: { backgroundColor: '#4A55A1', paddingHorizontal:16,paddingVertical:8, borderRadius: 8, margin: 4, minWidth: 90, alignItems: 'center' },
  label: { color: 'white', fontSize: 12 },
});

export default QuickActions;
