import { useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import { HelperText } from 'react-native-paper';
import { Text, View, Image, TextInput, SafeAreaView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../component/FirebaseManagement/AuthProvider';
import { hasErrors, hasValid, hasPasswordError, hasPassword } from '../../Helper/InputErrorHandler';
import { _Global_Images } from '../../imports/Image.import';

const ChildLoginForm = ({ route }: { route: any }): JSX.Element => {

    const { Signup, Signin } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const screenWidth: number = Dimensions.get("screen").width
    const screenHeight: number = Dimensions.get("screen").height
    const { title, subTitle, serverRoute } = route.params;
    const isPortrait: boolean = screenHeight > screenWidth;

    return (
        <>
            <SafeAreaView>
                <View style={{ ...styles.container }}>
                    <Image source={_Global_Images.LogoImage}
                        style={isPortrait ? { width: "100%", height: "43%" } : { width: "100%", maxHeight: "40%" }}
                    />
                    <Text
                        style={{
                            ...styles.Text
                        }}
                    >Leave your email & password Here</Text>


                    <TextInput
                        placeholder="Enter the emails"
                        onChangeText={setEmail}
                        textContentType='emailAddress'
                        value={email}
                        style={{
                            ...styles.EmailField,
                        }}
                        placeholderTextColor={"gray"}
                    />

                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                        <HelperText type='error' style={{ marginLeft: 50 }} visible={hasErrors(email)}>
                            Invalid Email
                        </HelperText>
                        <HelperText type='info' style={{ marginLeft: 50 }} visible={hasValid(email)}>
                            Invalid Email
                        </HelperText>
                    </View>

                    <TextInput
                        placeholder="Enter the password"
                        textContentType='password'
                        onChangeText={setPassword}
                        value={password}
                        style={{
                            ...styles.PasswordField
                        }}
                        placeholderTextColor={"gray"}
                    />

                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                        <HelperText type='error' style={{ marginLeft: 50 }} visible={hasPasswordError(password)}>
                            Invalid Password
                        </HelperText>
                        <HelperText type='info' style={{ marginLeft: 50 }} visible={hasPassword(password)}>
                            valid Password
                        </HelperText>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            ...styles.Pressable
                        }}
                        onPress={() => {
                            if (title === "Register Now") {
                                Signup(email, password);
                            } else {
                                Signin(email, password);
                            }
                        }}
                    >
                        <Text style={{
                            ...styles.PressableText
                        }}>{title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            marginHorizontal: 55,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 30,
                            paddingVertical: 10,
                            borderRadius: 23
                        }} onPress={() => {
                            subTitle === "Already a member" ?
                                navigation.navigate("Child-Signin" as never) :
                                (navigation.navigate("Child-Details" as never));
                        }}>
                        <Text style={{
                            color: "black",
                            fontFamily: "SemiBold"
                        }}>{subTitle}</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </>
    );
};


export default ChildLoginForm;


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        height: "100%"
    },
    EmailField: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        marginTop: 50,
        paddingHorizontal: 10,
        height: 50,
        borderColor: "#00716F",
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingVertical: 2,
        fontFamily: "monospace"
    },
    PasswordField: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        marginTop: 10,
        paddingHorizontal: 10,
        height: 50,
        borderColor: "#00716F",
        borderRadius: 10,
        paddingVertical: 2,
        fontFamily: "monospace"
    },
    Text: {
        fontSize: 25,
        fontFamily: "monospace",
        fontWeight: "600",
        alignSelf: "center",
        marginTop: 10,
    },
    Pressable: {
        marginHorizontal: 55,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#007166",
        paddingVertical: 10,
        borderRadius: 23
    },
    PressableText: {
        color: "white",
        fontFamily: "monospace",
        fontSize: 20
    }
})
