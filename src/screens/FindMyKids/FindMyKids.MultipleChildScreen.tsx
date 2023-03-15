import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"
import * as React from "react";
import { ScrollView, View, FlatList, StyleSheet, SafeAreaView, Pressable, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Appbar, Avatar, Button, MD2Colors, TouchableRipple, Text } from 'react-native-paper';
import { observer } from "mobx-react";
import { childCoordinate, CoordinateProvider } from "../../stores/useCoordinateStore";
import AddChildStack from "../../component/FindMyKids/ParentStack/AddChildStack";
import { UserContext } from "../../stores/userStore";
import backgroundServer from "react-native-background-actions";
import { handleFNChildLocation } from "../../component/FindMyKids/BackgroundTask/NotificationBGT";
import { _GlobalStyles } from "../../styles/global.style";
import Card from "../../component/FindMyKids/FindMyKids.Card";
import ClickableCard from "../../component/FindMyKids/ClickableCard.MultipleChildScreen";
import {_Global_Images} from "../../imports/Image.import"



// Screen that show the list of all paired childs at parent devices.
/**
 * Screen that show the list of all paired childs at parent devices.
 * @returns JSX.Element
 */
export const MultipleChildScreen = observer(() => {
    const Stack = createStackNavigator();

    const { CoordinateState } = React.useContext(CoordinateProvider);
    const { ispaired, storePairingCode, updateData, users } = React.useContext(UserContext);

    const navigation = useNavigation();

    const [mapReady, setMapReady] = React.useState(false);
    const [childsLocation, setChildsLocation] = React.useState(CoordinateState);
    const useMapRef = React.useRef<MapView>(null);

    React.useEffect(() => {
        if (users && ispaired && !(backgroundServer.isRunning())) handleFNChildLocation().catch(e => console.error(e));
        setChildsLocation(CoordinateState)
        const lagLog = CoordinateState.map((coordinate) => {
            return {
                latitude: coordinate.curr_coordinate.latitude,
                longitude: coordinate.curr_coordinate.longitude,
                latitudeDelta: 20,
                longitudeDelta: 20
            }
        })
        useMapRef.current?.fitToCoordinates(lagLog, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        });
        //   lagLog.forEach((region) => {
        //     useMapRef.current?.animateToRegion(region);
        //   })
    }, [CoordinateState])

    return (
        <>
            <Appbar.Header style={{ margin: 0, padding: 0 }}>
                <Appbar.Content title="" />
                <Appbar.Action icon="menu" onPress={() => { }} size={50} />
            </Appbar.Header>
            <View style={{ flexDirection: "column", flex: 1, width: "100%", height: "100%" }}>
                <Card />
                <Button style={{
                    width: Dimensions.get('window').width - 10,
                    position: 'absolute',
                    backgroundColor: "#F5FBFE",
                    borderRadius: 8,
                    bottom: 0,
                    marginHorizontal: 4,
                    flexDirection: "row",
                    marginVertical: 10,
                    height: "10%",
                    borderColor: "#B3E2FA",
                    borderWidth: 3,
                    alignItems: 'baseline',
                }}
                    icon={_Global_Images.BoyIcon}
                    
                    mode={"outlined"}
                    onPress={() => {
                        // navigation.navigate("addChilds" as never)
                        console.log("pressed");
                    }}
                    contentStyle={{
                        paddingEnd:300,
                        height: "100%",
                        backgroundColor:"#F5FBFE",
                    }}
                >
                    Add one more child
                </Button>
            </View></>
    )

})

export default MultipleChildScreen;