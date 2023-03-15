import { observer } from "mobx-react";
import * as React from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../../APIs_Keys";
import { childCoordinate } from "../../stores/useCoordinateStore";

export const Markers = observer((CoordinateState:any , mapRef:React.RefObject<MapView>) => {

  return (
    <React.Fragment>
      <Marker
        title="Start" 
        description="Starting Points" 
        coordinate={{
          latitude: CoordinateState?.init_coordinate?.latitude,
          longitude: CoordinateState?.init_coordinate?.longitude
        }} />
      <Circle
        center={{
          latitude: CoordinateState?.init_coordinate?.latitude,
          longitude: CoordinateState?.init_coordinate?.longitude
        }}
        radius={5}
        fillColor="rgba(0, 255, 0, 0.5)"
      />
      <Marker title="Destinations" description="Finishing Points" coordinate={
        {
          latitude: CoordinateState?.curr_coordinate?.latitude,
          longitude: CoordinateState?.curr_coordinate?.longitude
        }} />
      <Circle
        center={{
          latitude: CoordinateState?.curr_coordinate?.latitude,
          longitude: CoordinateState?.curr_coordinate?.longitude
        }}
        radius={5}
        fillColor="rgba(0, 255, 0, 0.5)"
      />

      <MapViewDirections
        origin={{
          latitude: CoordinateState?.init_coordinate?.latitude,
          longitude: CoordinateState?.init_coordinate?.longitude
        }}
        destination={{
          latitude: CoordinateState?.curr_coordinate?.latitude,
          longitude: CoordinateState?.curr_coordinate?.longitude
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
        optimizeWaypoints={false}
        onReady={result => {
          mapRef?.current?.fitToCoordinates(result.coordinates, {
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
  )
    // return CoordinateState?.map((coordinate, index) => {
    // })
  })

  export default Markers;