import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsPage from './SettingsPage.BottomModals';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';


const BottomModals = () => {

    interface IbottomSheetItems {
        itemID: number,
        title: string,
        iconName: string,
        color: string,
        size: number,
        renderItem: JSX.Element
    }

    const refRBSheet = useRef<RBSheet>(null);
    const [bottonSheetState, setBottomSheetState] = useState<IbottomSheetItems | null>(null);
    const [coords, setCoords] = useState({})
    const [bottomSheetItemObject, setBottomSheetItemObject] = useState<IbottomSheetItems[] | null>([
        {
            itemID: 1,
            title: "sos",
            iconName: "location-sharp",
            color: "green",
            size: 30,
            renderItem: (<Text style={{ textAlign: "center", color: "white" }}>SOS</Text>)

        },
        {
            itemID: 2,
            title: "Setting",
            iconName: "settings-outline",
            color: "green",
            size: 30,
            renderItem: (
                <ScrollView>
                    <SettingsPage />
                </ScrollView>
            )

        },
        {
            itemID: 3,
            title: "add",
            iconName: "add-circle-outline",
            color: "green",
            size: 30,
            renderItem: (<Text style={styles.text}>Add Parent</Text>)

        },
        {
            itemID: 4,
            title: "Chats",
            iconName: "chatbubble-ellipses-outline",
            color: "green",
            size: 30,
            renderItem: (<Text style={styles.text}>Surrounding</Text>)

        },
    ])

    const onShow = (bottomSheetItem: IbottomSheetItems) => {
        setBottomSheetState(bottomSheetItem);
        refRBSheet?.current?.open();
    }

    const handleNotification = async () => {
        await axios.post('https://findmykids.cyclic.app/notifications', {
            title: "Your Child is in Danger",
            body: `See location on maps`,
            topic: "SOS",
        },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            },
        ).catch(error => console.error(error));
    }

    const renderTouchableOpacity = () => {
        return (
            bottomSheetItemObject?.map((items, index) =>
                <TouchableOpacity key={items.itemID + index}
                    activeOpacity={0.7}
                    style={items.title === "sos" ? {
                        ...styles.button,
                        backgroundColor: "green", width: "45%", borderRadius: 25
                    } : {
                        ...styles.button,
                    }}
                    onPress={
                        () => {
                            items.title === "sos" ? handleNotification() :
                                onShow(items)
                        }
                    }>
                    {
                        items.title === "sos" ? items.renderItem :
                            <Ionicons name={items.iconName} size={items.size} color={items.color} />
                    }
                </TouchableOpacity>
            )
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {
                    renderTouchableOpacity()
                }
            </View>
            <SafeAreaView>
                <RBSheet
                    ref={refRBSheet}
                    height={400}
                    openDuration={250}
                    closeDuration={200}
                    closeOnDragDown={true}
                    dragFromTopOnly={true}
                    closeOnPressMask={true}
                    closeOnPressBack={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                    animationType='fade'
                >
                    {
                        bottonSheetState?.renderItem
                    }
                </RBSheet>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f2f2f2',
        padding: 10,
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    button: {
        padding: 10,
    },
    text: {
        textAlign: "center",
        color: "black"
    },
    modalStyle: {
        flex: 1,
        flexDirection: "column-reverse",
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        height: "50%",
        bottom: 0,
        top: "auto"
    }
})

export default BottomModals;