import React, { useRef, useContext } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "../../../APIs_Keys";
import Modals from "../../component/FindMyKids/Modals.index";
import { MapIndicators } from "../../component/FindMyKids/MapIndicators.MapContainer"
import { useCalculateLatAndLngDelta } from "../../Helper/UseScreenOrientation";
import { observer } from "mobx-react";
import { childCoordinate, CoordinateProvider } from "../../stores/useCoordinateStore";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { UserContext } from "../../stores/userStore";
import { handleFNChildLocation } from "../../component/FindMyKids/BackgroundTask/NotificationBGT"
import Markers from "../../component/FindMyKids/Markers.MapContainer";
import { useNavigation, useRoute } from "@react-navigation/native"
import backgroundServer from "react-native-background-actions";
import { Stack } from "../../imports/Global.import";



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MapsContainer = observer(({ route }: { route: any }) => {

  const { latDelta, lngDelta } = useCalculateLatAndLngDelta();
  const { CoordinateState } = useContext(CoordinateProvider);
  const [initializing, setInitializing] = React.useState(true);
  const { ispaired, storePairingCode, updateData, users } = React.useContext(UserContext);
  const mapStatus = route.params;
  const item = route.params;
  const [coordinates, setCoordinate] = React.useState(item)
  const mapsRef = useRef<MapView>(null);

  React.useEffect(() => {
    if (initializing) setInitializing(false);
    if (users && ispaired &&!(backgroundServer.isRunning())) handleFNChildLocation().catch(e => console.error(e));
  }, []);

  React.useEffect(() => {
    setCoordinate(item);
    const lagLog = CoordinateState.map((coordinate) => {
      return {
        latitude: coordinate.curr_coordinate.latitude,
        longitude: coordinate.curr_coordinate.longitude,
        latitudeDelta: 20,
        longitudeDelta: 20
      }
    })
    mapsRef.current?.fitToCoordinates(lagLog, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  }, [])

  if (initializing) return <ActivityIndicator style={{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  }} animating={true} color={MD2Colors.red800} />;



  return (

    <Stack.Navigator>
      <Stack.Screen name="maps"children={() => (
        <View style={styles.container}>
          {
            // mapping the changed state with previces state to update the previse state.
            mapStatus !== "AllInOne" && CoordinateState.filter((coord) => coord.code === item?.code).map(
              (childCoordinate, index) => (
                childCoordinate.isPaired &&
                <React.Fragment key={childCoordinate.uid}>
                  <View style={styles.container}>
                    <MapView
                      ref={mapsRef}
                      provider={PROVIDER_GOOGLE}
                      style={styles.map}
                      // showsUserLocation={true}
                      // followsUserLocation = {true}
                      region={{
                        latitude: childCoordinate?.init_coordinate?.latitude,
                        longitude: childCoordinate?.init_coordinate?.longitude,
                        latitudeDelta: latDelta,
                        longitudeDelta: lngDelta,
                      }}
                      children={(
                        <React.Fragment>
                          {/* <Marker
                            title={childCoordinate?.name}
                            coordinate={{
                              latitude: childCoordinate?.init_coordinate?.latitude,
                              longitude: childCoordinate?.init_coordinate?.longitude
                            }} /> */}
                          <Circle
                            center={{
                              latitude: childCoordinate?.init_coordinate?.latitude,
                              longitude: childCoordinate?.init_coordinate?.longitude
                            }}
                            radius={childCoordinate?.init_coordinate?.accuracy}
                            fillColor="rgba(0, 0, 0, 0.90)"
                          />
                          <Marker title={childCoordinate?.name} identifier={childCoordinate?.name}  coordinate={
                            {
                              latitude: childCoordinate?.curr_coordinate?.latitude,
                              longitude: childCoordinate?.curr_coordinate?.longitude
                            }} />
                          <Circle
                            center={{
                              latitude: childCoordinate?.curr_coordinate?.latitude,
                              longitude: childCoordinate?.curr_coordinate?.longitude
                            }}
                            radius={childCoordinate?.curr_coordinate?.accuracy}
                            fillColor="rgba(0, 0, 0, 0.90)"
                          />

                          <MapViewDirections
                            origin={{
                              latitude: childCoordinate?.init_coordinate?.latitude,
                              longitude: childCoordinate?.init_coordinate?.longitude
                            }}
                            destination={{
                              latitude: childCoordinate?.curr_coordinate?.latitude,
                              longitude: childCoordinate?.curr_coordinate?.longitude
                            }}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            optimizeWaypoints={false}

                            onReady={result => {
                              mapsRef?.current?.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                  right: 30,
                                  top: 300,
                                  left: 30,
                                  bottom: 100
                                }
                              });
                            }}
                          />
                        </React.Fragment>
                      )}
                    />
                    <MapIndicators title={"currentLocation"}
                      refs={mapsRef}
                      landscapeBottom={"20%"}
                      landscapeRight={"5%"}
                      bottom={"20%"}
                      right={"5%"}
                      ionicons={"location-sharp"}
                      iconSize={25}
                      lIconSize={20}
                      c_code={item?.code} />
                    <MapIndicators
                      landscapeBottom={"35%"}
                      landscapeRight={"5%"}
                      bottom={"28%"}
                      right={"5%"}
                      ionicons={"time-sharp"}
                      iconSize={25}
                      lIconSize={20} />
                  </View>
                </React.Fragment>
              )
            )
          }
          {
            mapStatus === "AllInOne" &&
            <React.Fragment>
              <View style={styles.container}>
                <MapView
                  ref={mapsRef}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  // showsUserLocation={true}
                  // followsUserLocation = {true}
                  region={{
                    latitude: CoordinateState[0]?.init_coordinate?.latitude,
                    longitude: CoordinateState[0]?.init_coordinate?.longitude,
                    latitudeDelta: latDelta,
                    longitudeDelta: lngDelta,
                  }}
                  children={(
                    CoordinateState.map(childCoordinate => (
                      <React.Fragment key={childCoordinate.uid}>
                        <Circle
                          center={{
                            latitude: childCoordinate?.init_coordinate?.latitude,
                            longitude: childCoordinate?.init_coordinate?.longitude
                          }}
                          radius={childCoordinate?.init_coordinate?.accuracy}
                          fillColor="rgba(0, 0, 0, 0.90)"
                        />
                        <Marker title={childCoordinate?.name} identifier={childCoordinate?.name} coordinate={
                          {
                            latitude: childCoordinate?.curr_coordinate?.latitude,
                            longitude: childCoordinate?.curr_coordinate?.longitude
                          }} />
                        <Circle
                          center={{
                            latitude: childCoordinate?.curr_coordinate?.latitude,
                            longitude: childCoordinate?.curr_coordinate?.longitude
                          }}
                          radius={childCoordinate?.curr_coordinate?.accuracy}
                          fillColor="rgba(0, 0, 0, 0.90)"
                        />

                        <MapViewDirections
                          origin={{
                            latitude: childCoordinate?.init_coordinate?.latitude,
                            longitude: childCoordinate?.init_coordinate?.longitude
                          }}
                          destination={{
                            latitude: childCoordinate?.curr_coordinate?.latitude,
                            longitude: childCoordinate?.curr_coordinate?.longitude
                          }}
                          apikey={GOOGLE_MAPS_APIKEY}
                          strokeWidth={3}
                          strokeColor="hotpink"
                          optimizeWaypoints={false}

                          onReady={result => {
                            mapsRef?.current?.fitToCoordinates(result.coordinates, {
                              edgePadding: {
                                right: 30,
                                top: 300,
                                left: 30,
                                bottom: 100
                              }
                            });
                          }}
                        />
                      </React.Fragment>
                    )))}
                />
                <MapIndicators title={"currentLocation"}
                  refs={mapsRef}
                  landscapeBottom={"20%"}
                  landscapeRight={"5%"}
                  bottom={"20%"}
                  right={"5%"}
                  ionicons={"location-sharp"}
                  iconSize={25}
                  lIconSize={20}
                  c_code={item?.code} />
                <MapIndicators
                  landscapeBottom={"35%"}
                  landscapeRight={"5%"}
                  bottom={"28%"}
                  right={"5%"}
                  ionicons={"time-sharp"}
                  iconSize={25}
                  lIconSize={20} />
              </View>
            </React.Fragment>
          }
          <View style={{ flexDirection: "column", width: "100%", backgroundColor: "white" }}>
            <Modals />
          </View>
        </View>
      )} />
    </Stack.Navigator>
  );
})



export default MapsContainer;