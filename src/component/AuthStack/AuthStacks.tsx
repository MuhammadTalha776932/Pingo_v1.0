/**
 * AuthStacks is the Stack Navigation which handle the firebase Authentication 
 * provide the sign up and sign in screen for users. ParentRegister component
 *  working for parent devices and child devices too. 
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from '../../imports/Global.import';
// import { createStackNavigator } from '@react-navigation/stack';
import ParentRegister from '../../screens/FindMyKids/FindMyKids.ParentRegister';

export const AuthStacks = (): JSX.Element => {
  // const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}>
      <Stack.Screen name='Parent-Signin'
        component={ParentRegister}
        initialParams={{
          title: "Sign In",
          subTitle: "Go back to Sign Up",
          serverRoute: "signin"
        }} />
      <Stack.Screen name='Parent-Signup' component={ParentRegister} initialParams={{ title: "Register Now", subTitle: "Already a member", serverRoute: "signup" }} />
    </Stack.Navigator>
  );
};

export default AuthStacks;

const styles = StyleSheet.create({
  container: {}
});
