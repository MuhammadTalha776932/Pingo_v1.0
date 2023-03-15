import * as React from "react";
import auth from "@react-native-firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

let initialState: any;
export const AuthContext = React.createContext(initialState);

interface IAuthProviderType {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderType) => {
    const [user, setUser] = React.useState(null);
    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    setUser,
                    Signin: async (email: string, password: string) => {
                        try {
                            await auth().signInWithEmailAndPassword(email, password)
                                .catch(error => Alert.alert("Sign In Error", error?.message))

                        } catch (error: any) {

                            Alert.alert("Sign In Error", error?.message)
                            await AsyncStorage.setItem("@SignInError", JSON.stringify(
                                error?.message
                            ))
                            console.log(error.message);
                        }
                    },
                    Signup: async (email: string, password: string) => {
                        try {
                            await auth().createUserWithEmailAndPassword(email, password)
                                .catch(error => Alert.alert("Sign In Error", error?.message))
                        } catch (error: any) {
                            Alert.alert("Sign In Error", error?.message)
                            await AsyncStorage.setItem("@SignUpError", JSON.stringify(
                                error?.message
                            ))
                            console.log(error.message);
                        }
                    },
                    Signout: async (noProps: any) => {
                        try {
                            await auth().signOut()
                                .catch(error =>  Alert.alert("Sign Out Error", error?.message))

                        } catch (error: any) {
                            Alert.alert("Sign Out Error", error?.message)
                            console.log(error);
                        }
                    }
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}