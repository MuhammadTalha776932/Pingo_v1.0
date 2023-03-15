import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import Contents from './Contents.MapContainer';
import Settings from './Menu.Modals';
import ModalContents from './ModalContents.Modals';
import RBSheet from "react-native-raw-bottom-sheet";

const Modals = () => {

    const [bottonSheetContentRender, setBottomSheetContentRender] = useState<IbottomSheetItems | null>(null);
    const refRBSheet = useRef<RBSheet>(null);

    interface IbottomSheetItems {
        itemID: number,
        title: string,
        iconName: string,
        color: string,
        size: number,
        renderItem: JSX.Element
    }

    const [modalItems, setModalItems] = React.useState<IbottomSheetItems[] | null>([
        {
            itemID: 1,
            title: "location",
            iconName: "location-sharp",
            color: "green",
            size: 30,
            renderItem: (
                <ScrollView>
                    <Contents />
                </ScrollView>
            )

        },
        {
            itemID: 2,
            title: "route",
            iconName: "navigate-circle-sharp",
            color: "green",
            size: 30,
            renderItem: (<Text style={styles.text}>Route</Text>)

        },
        {
            itemID: 3,
            title: "add",
            iconName: "add-circle-sharp",
            color: "green",
            size: 30,
            renderItem: (<ScrollView>
                <ModalContents />
            </ScrollView>)

        },
        {
            itemID: 4,
            title: "surrounding",
            iconName: "mic-sharp",
            color: "green",
            size: 30,
            renderItem: (<Text style={styles.text}>Surrounding</Text>)

        },
        {
            itemID: 5,
            title: "setting",
            iconName: "menu-sharp",
            color: "green",
            size: 30,
            renderItem: (
                <ScrollView>
                    <Settings />
                </ScrollView>
            )

        },

    ])

    const onShow = (bottomSheetItem: IbottomSheetItems) => {
        setBottomSheetContentRender(bottomSheetItem);
        refRBSheet?.current?.open()
    }
    const renderTouchableOpacity = () => {
        return (
            modalItems?.map((items, index) =>
                <TouchableOpacity key={items.itemID + index} activeOpacity={0.7} style={styles.button} onPress={
                    () => {
                        onShow(items)
                    }
                }>
                    <Ionicons name={items.iconName} size={items.size} color={items.color} />
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
                        bottonSheetContentRender?.renderItem
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

export default Modals;