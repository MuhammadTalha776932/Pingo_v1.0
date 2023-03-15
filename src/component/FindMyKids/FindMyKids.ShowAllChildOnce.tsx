import { observer } from 'mobx-react';
import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ClickableCard from './ClickableCard.MultipleChildScreen';
import { childCoordinate } from '../../stores/useCoordinateStore';
import { useNavigation } from '@react-navigation/native';
interface ShowAllChildOnceProps {
    CoordinateState: childCoordinate[],
    useMapRef: React.RefObject<MapView>
}

/**
 *  Component that show the Childs information like name , their mobile status and coordinate.
 *  return the Pressable component that navigate to the MapContainer which consist of maps and show the 
 *  selected child coordinates.
 */

const ShowAllChildOnce = observer(({ CoordinateState, useMapRef }: ShowAllChildOnceProps) => {
    const navigation = useNavigation();
    const handleMarkerPress = () => {
        // Redirect to the map with the user's location
        navigation.navigate("MapContainer" as never, "AllInOne" as never)
    };
    return (
        <View style={{
            alignItems: 'center',
        }}>
            <Pressable
                style={{
                    height: Dimensions.get('window').height / 2,
                    width: Dimensions.get('window').width - 10,
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginVertical: 8,
                    shadowRadius: 20,
                    shadowColor: "gray",
                    elevation: 10
                }}
                onPress={handleMarkerPress}
            >
                <MapView
                    scrollEnabled={false}
                    showsScale
                    ref={useMapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: CoordinateState[0].curr_coordinate.latitude,
                        longitude: CoordinateState[0].curr_coordinate.longitude,
                        latitudeDelta: 20,
                        longitudeDelta: 20,
                    }}
                >
                    {
                        CoordinateState?.map(maps => (
                            <React.Fragment key={maps.uid}>
                                <Marker
                                    coordinate={{
                                        latitude: maps.curr_coordinate.latitude,
                                        longitude: maps.curr_coordinate.longitude,
                                    }}
                                />
                            </React.Fragment>
                        ))
                    }
                </MapView>
                <ClickableCard title='Muhammad Talha' batteryStatus='100%' isOnline={true} selectKidCoordinate={undefined} />
            </Pressable>
        </View>

    );
})

export default ShowAllChildOnce;

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
