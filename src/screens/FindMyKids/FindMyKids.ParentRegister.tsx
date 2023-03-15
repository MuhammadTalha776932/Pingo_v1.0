/**
 * ParentRegister is screen that handle and send the user form data to firebase server and store the 
 * response like user object.
 */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, SafeAreaView, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { hasErrors, hasValid, hasPasswordError, hasPassword } from '../../Helper/InputErrorHandler';
import { AuthContext } from  "../../component/FirebaseManagement/AuthProvider";
import { _Global_Images } from '../../imports/Image.import';

const ParentRegister = ({ route }: { route?: any }): JSX.Element => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [emptyNotification, setNotification] = React.useState("");
    const screenWidth: number = Dimensions.get("screen").width
    const { title, subTitle, serverRoute } = route.params;
    const screenHeight: number = Dimensions.get("screen").height
    const { Signup, Signin } = React.useContext(AuthContext);
    const isPortrait = screenHeight > screenWidth;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={{
                flex: 1,
            }}>
                <View style={{ ...styles.container }}>
                    <Image source={_Global_Images.LogoImage}
                        style={isPortrait ? { width: "100%", height: "43%" } : { width: "100%", maxHeight: "40%" }}
                    />
                    <Text
                        style={{
                            ...styles.Text,
                            marginBottom:5
                        }}
                    >Leave your email & password Here</Text>


                    <TextInput
                        placeholder="Enter the emails"
                        textContentType='emailAddress'
                        value={email}
                        onChangeText={email => {
                            setEmail(email);
                        }}
                        style={
                            {
                                ...styles.PasswordField
                            }
                        }
                        placeholderTextColor={"gray"}
                    />

                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                        <HelperText type='error' style={{ marginLeft: 50 }} visible={hasErrors(email)}>
                            Invalid Email
                        </HelperText>
                        <HelperText type='info' style={{ marginLeft: 50 }} visible={hasValid(email)}>
                            Valid Email
                        </HelperText>
                    </View>
                    
                    <TextInput
                        placeholder="Enter the password"
                        textContentType='password'
                        passwordRules="required:digit; minlength: 6;"
                        value={password}
                        onChangeText={password => {
                            setPassword(password);
                        }}
                        style={
                            {
                                ...styles.PasswordField
                            }
                        }
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
                        //  onPress={() => sendPostRequest(email, "Parent", navigation, "MapContainer",password,serverRoute)}
                        onPress={() => {
                            if (title === "Register Now") {
                                if (email.length !== 0 && password.length !== 0) {
                                    Signup(email, password)
                                }
                                else {
                                    setNotification("Please Enter the Email and Password")
                                }
                            } else {
                                if (email.length !== 0 && password.length !== 0) {
                                    Signin(email, password);
                                }
                                else {
                                    setNotification("Please Enter the Email and Password")
                                }
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
                                (navigation.navigate("Parent-Signin" as never)) :
                                (navigation.navigate("Parent-Signup" as never));
                        }}>
                        <Text style={{
                            color: "black",
                            fontFamily: "SemiBold"
                        }}>{subTitle}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};
export default ParentRegister;

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
        marginTop: 10,
        paddingHorizontal: 10,
        height: 50,
        paddingVertical: 2,
        fontFamily: "monospace"
    },
    Text: {
        fontSize: 25,
        fontFamily: "monospace",
        fontWeight: "600",
        alignSelf: "center",
        marginTop: 10
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