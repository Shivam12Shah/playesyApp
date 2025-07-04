import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const playingTypes = ['Beginner', 'Intermediate', 'Pro'];
const sportsList = ['Football', 'Cricket', 'Badminton', 'Tennis', 'Basketball'];

const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('9876543210');
  const [playingType, setPlayingType] = useState('Intermediate');
  const [sports, setSports] = useState(['Football', 'Badminton']);
  const [followers] = useState(120);
  const [following] = useState(75);

  const toggleSport = (sport) => {
    setSports(sports.includes(sport)
      ? sports.filter(s => s !== sport)
      : [...sports, sport]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=5B5BD6&color=fff&size=128' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.followBox}>
          <Text style={styles.followCount}>{following}</Text>
          <Text style={styles.followLabel}>Following</Text>
        </View>
        <View style={styles.followBox}>
          <Text style={styles.followCount}>{followers}</Text>
          <Text style={styles.followLabel}>Followers</Text>
        </View>
      </View>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        {editMode ? (
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        ) : (
          <Text style={styles.value}>{name}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        {editMode ? (
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        ) : (
          <Text style={styles.value}>{email}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Phone</Text>
        {editMode ? (
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        ) : (
          <Text style={styles.value}>{phone}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Playing Type</Text>
        {editMode ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {playingTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, playingType === type && styles.chipSelected]}
                onPress={() => setPlayingType(type)}
              >
                <Text style={{ color: playingType === type ? '#fff' : '#5B5BD6' }}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.value}>{playingType}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Favorite Sports</Text>
        {editMode ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {sportsList.map(sport => (
              <TouchableOpacity
                key={sport}
                style={[styles.chip, sports.includes(sport) && styles.chipSelected]}
                onPress={() => toggleSport(sport)}
              >
                <Text style={{ color: sports.includes(sport) ? '#fff' : '#5B5BD6' }}>{sport}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.value}>{sports.join(', ')}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: editMode ? '#5B5BD6' : '#eee' }]}
        onPress={() => setEditMode(!editMode)}
      >
        <Text style={{ color: editMode ? '#fff' : '#5B5BD6', fontWeight: '600' }}>{editMode ? 'Save' : 'Edit Profile'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: '#5B5BD6' },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#5B5BD6', borderRadius: 16, padding: 6, borderWidth: 2, borderColor: '#fff' },
  followRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  followBox: { alignItems: 'center', marginHorizontal: 16 },
  followCount: { fontWeight: '700', fontSize: 16, color: '#5B5BD6' },
  followLabel: { color: '#888', fontSize: 12 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24, color: '#5B5BD6' },
  section: { marginBottom: 18 },
  label: { color: '#888', fontSize: 14, marginBottom: 4 },
  value: { fontSize: 16, color: '#222' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, color: '#222' },
  chip: { borderWidth: 1, borderColor: '#5B5BD6', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 14, marginRight: 8, marginBottom: 8 },
  chipSelected: { backgroundColor: '#5B5BD6', borderColor: '#5B5BD6' },
  button: { marginTop: 32, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
});

export default ProfileScreen;