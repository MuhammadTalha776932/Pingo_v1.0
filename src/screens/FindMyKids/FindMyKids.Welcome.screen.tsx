import * as React from 'react';
import { Animated, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundImage from '../../component/Utils/BackgroundImage';
import BottomButtonWithLink from '../../component/Utils/BottomButtonWithLink';
import Scrollable from '../../component/Utils/Scrollable';
import { WelcomeScreenData } from '../../data/WelcomeScreen.data';
import { IUseScreenOrientation, useScreenOrientation } from '../../Helper/UseScreenOrientation';
import { _Global_Images } from '../../imports/Image.import';
import { ColorThemes } from '../../styles/global.style';


interface WelcomeScreenProps { }

let count = 0

const WelcomeScreen = (props: WelcomeScreenProps) => {
    const { width, height } = Dimensions.get("window")
    const [WindowWidth, setWindowWidth] = React.useState<number>(width);
    const [WindowHeight, setWindowHeight] = React.useState<number>(height);
    const { isPortrait } = useScreenOrientation({ WindowWidth, WindowHeight })
    const [isPortraitScreen, setIsPortraitScreen] = React.useState<boolean>(isPortrait);
    const animationValue = new Animated.Value(0);

    React.useEffect(() => {
        const subscription = Dimensions.addEventListener("change", ({ window: { height, width } }) => {
            setWindowWidth(width);
            setWindowHeight(height);
            const { isPortrait } = useScreenOrientation({ WindowWidth: width, WindowHeight: height })
            setIsPortraitScreen(isPortrait);
            Animated.timing(animationValue, {
                toValue: isPortrait ? 0 : 1,
                duration: 500,
                useNativeDriver: false,
            }).start();
        })

        return () => {
            subscription
        }
    }, [])

    const interpolatedStyles = {
        fontSize: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 30],
        }),
        marginVertical: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 20],
        }),
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        ImageContainer: {
            shadowColor: '#000',
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 10,
        },
        Image: {

            position: "absolute",
            top: WindowHeight / 4,
        },
        ImageLandScape: {
            position: "absolute",
            top: WindowHeight / 7
        }
    });
    const style = StyleSheet.create({

        container: {
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            position: "absolute",
            top: Dimensions.get("screen").height/3,
            paddingTop: 50,
            overflow: 'hidden',
            marginHorizontal: 10,
            // height:"30%",
        
            // width: 450,
            elevation: 6,
            borderRadius:10,
        },
        image: {
            position: 'absolute',
            top: 30,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            height:400
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginHorizontal: 20,
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 18,
            marginHorizontal: 20,
            marginBottom: 20,
        },
    });


    return (
        <React.Fragment>
            <SafeAreaView style={{
                ...styles.container,
            }}>
                <BackgroundImage imageUrl={_Global_Images.BackgroundImage} opacity={1} />
                <Scrollable isPortraitScreen={isPortraitScreen}>
                            <Image
                                source={_Global_Images.WelcomeImage}
                                style={style.image}
                                resizeMode="contain"
                            />
                    <View style={style.container}>
                        <Text style={style.title}>Hi! I'm Pingo</Text>
                        <Text style={style.subtitle}>Let me show you how the app works</Text>
                    </View>


                    {/* <View style={{ ...styles.ImageContainer }}>
                    <Image source={welcomeImage} resizeMode={"cover"}
                        style={isPortraitScreen? {
                            ...styles.Image,
                        }:{
                            ...styles.ImageLandScape,
                            top:WindowHeight/7
                        }}
                    />
                </View> */}
                </Scrollable>
                <BottomButtonWithLink buttonText={WelcomeScreenData.buttonText} linkText={WelcomeScreenData.linkText} />
            </SafeAreaView>
        </React.Fragment>
    );
};

export default WelcomeScreen;

