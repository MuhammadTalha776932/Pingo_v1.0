import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Checkbox} from "react-native-paper"
import BackgroundImage from '../../component/Utils/BackgroundImage';
import { _Global_Images } from '../../imports/Image.import';
_Global_Images
interface PingoSplashScreenProps { }

const PingoSplashScreen = (props: PingoSplashScreenProps) => {
    const {PingoLaunchScreenImage} = _Global_Images;
    return (
        <React.Fragment>
            <View style={styles.container}>
                <BackgroundImage imageUrl={PingoLaunchScreenImage} opacity={1}/>
            </View>
        </React.Fragment>
    );
};

export default PingoSplashScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
});
