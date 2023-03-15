import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from '../../imports/Global.import';
// import { createStackNavigator } from '@react-navigation/stack';
import ChildLoginForm from '../../screens/Pingo/Pingo.ChildLoginForm';


export const ChildAuthStacks = (): JSX.Element => {
  // const Stack = createStackNavigator();
  return (
    <Stack.Navigator  screenOptions={({ navigation, route }) => ({ header: () => null })}>
      <Stack.Screen name='Child-Signin' component={ChildLoginForm} initialParams={{ title: "Sign In", subTitle: "Go back to Sign Up",serverRoute:"signin" }} />
      <Stack.Screen name='Child-Details' component={ChildLoginForm} initialParams={{ title: "Register Now", subTitle: "Already a member", serverRoute:"signup" }} />
    </Stack.Navigator>
  );
};

export default ChildAuthStacks;

const styles = StyleSheet.create({
  container: {}
});
