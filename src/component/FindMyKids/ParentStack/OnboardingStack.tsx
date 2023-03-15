import * as React from "react";
import { View } from "react-native";
import { Stack } from "../../../imports/Global.import";
import OnboardingScreen from "../../../screens/FindMyKids/FindMyKids.OnboardingScreen";
import WelcomeScreen from "../../../screens/FindMyKids/FindMyKids.Welcome.screen";

interface OnboardingStackProps {

}

export const OnboardingStack = (Props:OnboardingStackProps) =>{
    return (
        <React.Fragment>
            <Stack.Navigator screenOptions={({navigation,route})=>({
                header: () => null
            })}>
                <Stack.Screen name="welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Screen One" children={()=>(
                    <>
                        <OnboardingScreen title="Screen One" navigateToScreen="Screen Two"/>
                    </>
                )}/>
                <Stack.Screen name="Screen Two" children={()=>(
                    <>
                        <OnboardingScreen title="Screen Two" navigateToScreen="Screen One"/>
                    </>
                )}/>
                {/* Added the other screen there */}
            </Stack.Navigator>
        </React.Fragment>
    )
}