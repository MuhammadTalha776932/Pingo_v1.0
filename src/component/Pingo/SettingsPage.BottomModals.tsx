import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const SettingsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <TouchableOpacity style={styles.listItem} onPress={() => console.log('Settings clicked')}>
        <Text style={styles.listItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={() => console.log('Profile clicked')}>
        <Text style={styles.listItemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem} onPress={() => console.log('Sign Out clicked')}>
        <Text style={styles.listItemText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listItemText: {
    fontSize: 16,
  },
});

export default SettingsPage;