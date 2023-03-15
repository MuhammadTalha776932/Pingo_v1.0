// import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"
import * as React from "react";
import { Text, ScrollView, View, FlatList, StyleSheet, SafeAreaView, Pressable, TouchableOpacity } from "react-native";
import { Stack } from "../../../imports/Global.import";
import AddChildScreen from "../AddCodeScreen.MultipleChildScreen";

export const AddChildStack = () => {
    // const Stack = createStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
            <Stack.Navigator>
                <Stack.Screen
                    name="addMoreChilds"
                    children={() =>
                        <>
                            <AddChildScreen/>
                        </>
                    }
                />
                <Stack.Screen
                    name="newCodeScreen"
                    children={() =>
                        <>
                            <Text>
                                Here is New Code:
                            </Text>
                        </>
                    }
                />


            </Stack.Navigator>
        </View>
    )

}

export default AddChildStack;