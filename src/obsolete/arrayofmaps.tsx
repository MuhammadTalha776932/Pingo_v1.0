import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Card: React.FC = () => {
  const maps = [
    { id: 1, latitude: 37.78825, longitude: -122.4324 },
    { id: 2, latitude: 37.7749, longitude: -122.4194 },
    { id: 3, latitude: 37.7894, longitude: -122.3945 },
    { id: 4, latitude: 37.7858, longitude: -122.401 },
    { id: 5, latitude: 37.7949, longitude: -122.4103 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {maps.map(map => (
        <View key={map.id} style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: map.latitude,
              longitude: map.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: map.latitude, longitude: map.longitude }}
            />
          </MapView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  mapContainer: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width - 32,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

