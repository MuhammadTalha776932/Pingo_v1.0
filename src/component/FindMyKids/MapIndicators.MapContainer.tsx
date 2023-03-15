import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CoordinateProvider } from '../../stores/useCoordinateStore';
import { useCalculateLatAndLngDelta, useScreenOrientation } from "../../Helper/UseScreenOrientation" // '../UseScreenOrientation';

interface propsWithPostion {
    [key: string]: any
}

interface CurrentLocationType {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

/**
 * MapIndicators is the mobx observer function that working as the current location pointer in the maps view.
 */
export const MapIndicators = observer((props: propsWithPostion) => {
    const { latDelta, lngDelta } = useCalculateLatAndLngDelta();
    const [isPortrait, setIsPortrait] = React.useState(true);
    const { bottom, right, ionicons, landscapeBottom, landscapeRight, iconSize, title, refs, c_code } = props;

    const { CoordinateState } = React.useContext(CoordinateProvider);

    const [currentLocation, setCurrentLocation] = React.useState<CurrentLocationType | undefined>();

    React.useEffect(() => {
        const unsub = Dimensions.addEventListener("change", () => setIsPortrait(useScreenOrientation));
        CoordinateState.filter(childs => childs.code === c_code)
        .forEach(coordinate => {
            setCurrentLocation({
                latitude: coordinate?.curr_coordinate?.latitude,
                longitude: coordinate?.curr_coordinate?.longitude,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
            })
        })
        return () => {
            unsub;
        }
    }, [CoordinateState])



    const styles = StyleSheet.create({
        portraitTouchableOpacityStyle: {
            position: "absolute",
            bottom: bottom,
            right: right,
            backgroundColor: "white",
            padding: "2%",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 50,
        },
        landscapeTouchableOpacityStyle: {
            position: "absolute",
            bottom: landscapeBottom,
            right: landscapeRight,
            backgroundColor: "white",
            padding: "1%",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 25,
        }
    });

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                style={isPortrait ? styles.portraitTouchableOpacityStyle : styles.landscapeTouchableOpacityStyle}>
                <Ionicons name={ionicons} size={iconSize} color={"green"}
                    onPress={title === "currentLocation" ? () => {
                        refs?.current?.animateToRegion({
                            ...currentLocation
                        })
                    } : () => {

                    }}
                />
            </TouchableOpacity>

        </>
    );
});

export default MapIndicators;


