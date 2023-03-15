import React from 'react';
import { Alert, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Replace with your desired icon library
import { useScreenOrientation } from '../../Helper/UseScreenOrientation';
import { observer } from 'mobx-react';
import Clipboard from '@react-native-clipboard/clipboard';
import { UserContext } from '../../stores/userStore';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../component/Utils/BackgroundImage';
import BottomButtonWithLink from '../../component/Utils/BottomButtonWithLink';
import { SharedLinkScreenData } from '../../data/SharedLinkScreen.data';
import { ColorThemes } from '../../styles/global.style';
const backgroundImage = require("../../assets/images/background.png");

const SharedLinkScreen
    = observer(() => {

        let navigation = useNavigation()

        const { storePairingCode } = React.useContext(UserContext);
        const { width, height } = Dimensions.get("window")
        let { isPortrait } = useScreenOrientation({ WindowWidth: width, WindowHeight: height })
        const [isPortraitScreen, setIsPortraitScreen] = React.useState<boolean>(isPortrait)
        const [isCodeExist, setIsCodeExist] = React.useState<boolean>(false);

        const handleCopyToClipboard = (code: string[]) => {
            Clipboard.setString(code[0]);
            Alert.alert('Code copied to clipboard!', `Here is Code ${code}`);
        };

        const handleBackPage = () => {
            // navigation?.goBack();
        }

        React.useEffect(() => {
            storePairingCode.length !== 0 && setIsCodeExist(true);
            Dimensions.addEventListener("change", ({ window: { height, width } }) => {
                let { isPortrait } = useScreenOrientation({ WindowWidth: width, WindowHeight: height });
                setIsPortraitScreen(isPortrait);
            })
        }, [Dimensions, storePairingCode, isCodeExist])
        return (
            <SafeAreaView style={styles.SuperContainer}>
                <BackgroundImage imageUrl={backgroundImage} opacity={1} />
                <ScrollView contentContainerStyle={!isPortraitScreen ? { height: "150%" }:{height:"60%"}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    centerContent={true}
                    bounces={true}
                >
                    <View style={
                        isPortraitScreen ? {
                            ...styles.container, height: "auto",
                        } : {
                            ...styles.container, height: "40%",
                        }
                    }>
                        <View style={styles.BodyContainer}>
                            <Ionicons name="arrow-back-outline" size={25} color="#0080FF" style={styles.iconStyle} onPress={handleBackPage} />
                            <Text style={styles.title}>{SharedLinkScreenData.title}
                            </Text>
                            {/* component that show the pingo application logo with link */}
                            <View style={{
                                height: 100,
                                backgroundColor: "#E6F3FF",
                                borderRadius: 10,
                                marginVertical: 5,
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "500",
                                    marginStart: 40,
                                    color: "black"

                                }}>Pingo by Find My Kids</Text>
                            </View>
                            <Text style={styles.subtitle}>{SharedLinkScreenData.subTitle}</Text>
                        </View>
                    </View>
                </ScrollView>
                <BottomButtonWithLink
                    buttonText={SharedLinkScreenData.buttonText}
                    linkText={SharedLinkScreenData.linkText}
                    styling={true}
                />
            </SafeAreaView>

        );
    });
const styles = StyleSheet.create({
    SuperContainer: {
        flex: 1,
    },
    iconStyle: {
        marginTop: 5,
        marginLeft: 5
    },
    BodyContainer: {
        marginHorizontal: 10,
        marginVertical: 30,
    },
    container: {
        marginTop: 40, // Add desired margin from top
        marginLeft: 20, // Add desired margin from left
        marginRight: 20, // Add desired margin from right
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        elevation: 1
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        textAlign: "center",
        color: "#242424"
    },
    code: {
        fontSize: 48,
        marginTop: 10,
        textAlign: "center",
        color: "#0080FF"
    },
    subtitle: {
        fontSize: 14,
        marginTop: 20,
        marginHorizontal: 10,
        textAlign: "center",
        color: "#303B45",
    }
});
export default SharedLinkScreen
    ;
