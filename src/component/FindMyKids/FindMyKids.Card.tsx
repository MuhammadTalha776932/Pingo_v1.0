import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { CoordinateProvider } from '../../stores/useCoordinateStore';
import { _GlobalStyles } from '../../styles/global.style';
import { TouchableRipple } from "react-native-paper"
import { observer } from 'mobx-react';
import ClickableCard from './ClickableCard.MultipleChildScreen';
import ShowAllChildOnce from './FindMyKids.ShowAllChildOnce';

type Props = {
  username: string;
  latitude: number;
  longitude: number;
};

const Card = observer(() => {

  const { CoordinateState } = React.useContext(CoordinateProvider);
  const [kidsCoordinate, setKidsCoordiante] = React.useState(CoordinateState);
  const useMapRef = React.useRef<MapView>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    setKidsCoordiante(CoordinateState);
    const lagLog = CoordinateState.map((coordinate) => {
      return {
        latitude: coordinate.curr_coordinate.latitude,
        longitude: coordinate.curr_coordinate.longitude,
        latitudeDelta: 20,
        longitudeDelta: 20
      }
    })
    // useMapRef.current?.fitToCoordinates(lagLog, {
    //   edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
    //   animated: true,
    // });
    lagLog.forEach((region) => {
      useMapRef.current?.animateToRegion(region);
    })
  }, [kidsCoordinate])

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingBottom: 120,
    },
    mapContainer: {
      height: Dimensions.get('window').height / 2,
      width: Dimensions.get('window').width - 10,
      borderRadius: 8,
      overflow: 'hidden',
      marginVertical: 5,
      elevation: 10,
      shadowOpacity: 20,
      shadowColor: "#B3E2FA",
      shadowRadius: 30
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  const handleNavigation = (selectCoordinate: any) => {
    let item = { ...selectCoordinate };
    // navigation?.setParams(item) 
    // navigation?.navigate("MapContainer" as never,item as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ShowAllChildOnce CoordinateState={CoordinateState} useMapRef={useMapRef}/>
      {kidsCoordinate && kidsCoordinate.map(map => (
        <View key={map.uid} style={styles.mapContainer}>
          <TouchableRipple
            style={styles.mapContainer}
            onPress={() => handleNavigation(map)}
            rippleColor="rgba(0, 0, 0, 0.32)"
          >
            <MapView
              scrollEnabled={false}
              scrollDuringRotateOrZoomEnabled={false}
              showsScale={false}
              ref={useMapRef}
              zoomControlEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              style={styles.map}
              initialRegion={{
                latitude: map.curr_coordinate.latitude,
                longitude: map.curr_coordinate.longitude,
                latitudeDelta: 15,
                longitudeDelta: 15,
              }}
            >
              <Marker
                coordinate={{
                  latitude: map.curr_coordinate.latitude,
                  longitude: map.curr_coordinate.longitude,
                }}

              >
                <Callout>
                  <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10,
                  }}>
                    <Text style={{fontWeight: 'bold',}}>{map?.name}</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>
          </TouchableRipple>
          <ClickableCard title={map.name} batteryStatus={"100" + "%"} isOnline={true} selectKidCoordinate={map}/>
        </View>
      ))}
    </ScrollView>
  );
});



export default Card;
