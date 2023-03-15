import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

export const Stack = createStackNavigator();

interface StackNavigatorProps {
    children: React.ReactNode
}
export const StackNavigator = ({children}:StackNavigatorProps) => {
    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}>
            {children}
        </Stack.Navigator>
    )
}