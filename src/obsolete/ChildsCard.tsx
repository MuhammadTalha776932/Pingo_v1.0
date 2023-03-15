import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native';

interface UserLocation {
    ID?: number,
    name: string;
    latitude: number;
    longitude: number;
}

export const ChildsCard = (userLocations: any) => {
    const [userLocation, setUserLocation] = useState(userLocations);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {

        setUserLocation(userLocations)
        // Get the user's current location
        // navigator.geolocation.getCurrentPosition(
        //   position => {
        //   error => console.log(error),
        //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        // );
    }, []);

    const handleMarkerPress = () => {
        // Redirect to the map with the user's location
        console.log('Redirecting to user location');
    };

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            {
                userLocation &&
                <View style={styles.container}>
                    <MapView
                        scrollEnabled={false}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        onLayout={() => setMapReady(true)}
                        region={{
                            latitude: userLocations?.latitude || 34.00012,
                            longitude: userLocations?.longitude || 74.20123,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        {
                            mapReady &&
                            <Marker
                                coordinate={{
                                    latitude: userLocations?.latitude || 34.00012,
                                    longitude: userLocations?.longitude || 74.20123,
                                }}
                                title={"Current Here"}
                                onPress={handleMarkerPress}
                            />
                        }
                    </MapView>

                    <Pressable onPress={handleMarkerPress}>
                        <View style={styles.userLocation}>
                            <Avatar.Icon size={30} icon="account" />
                            <Text style={styles.userName}>
                                {userLocations?.name}
                            </Text>
                            <Text style={styles.userCoordinates}>
                                {userLocations?.latitude}, {userLocations?.longitude}
                            </Text>
                        </View>
                    </Pressable>
                </View>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: "50%"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    userLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#ffffff',
        position: "relative",
        padding: 10,
        elevation: 5,
    },
    userName: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    userCoordinates: {
        marginLeft: 10,
    },
});

export default ChildsCard;
