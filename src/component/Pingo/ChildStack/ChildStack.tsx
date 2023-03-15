//#region Imports Libraries...
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Home from '../../../screens/Pingo/HomeScreen/Pingo.Home';
import { requestLocationPermission } from '../../../Permissions/ChildDevices.Permission';
import ChildAuthStacks from '../../AuthStack/ChildAuthStacks';
import { AuthContext } from '../../FirebaseManagement/AuthProvider';
import auth from "@react-native-firebase/auth"
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { sendPostRequest } from '../../../Helper/SendToServer';
import { handleBackground } from '../BackGroundTask/GeolocationTask';
import EnterCodeScreen from '../../../screens/Pingo/Pingo.EnterCodeScreen';
import { observer } from 'mobx-react';
import { ChildsContext, ChildsProvider } from '../../../stores/childstores/ChildStore';
import ChildFormScreen from '../../../screens/Pingo/Pingo.ChildFormScreen';
import backgroundServer from 'react-native-background-actions';
import { Stack } from '../../../imports/Global.import';
import PingoSplashScreen from '../../../screens/Pingo/Pingo.SplashScreen';
//#endregion



export const ChildStack = observer((): JSX.Element => {

  const { user, setUser, Signout } = React.useContext(AuthContext);

  const [initializing, setInitializing] = React.useState(true);

  const { storeEnterCode, ispaired } = React.useContext(ChildsContext);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (ispaired) sendPostRequest(user, "Child", storeEnterCode);
    if (ispaired && !(backgroundServer.isRunning())) handleBackground();
    if (initializing) setInitializing(false);
    console.log(storeEnterCode)
  }
  React.useEffect(() => {
    requestLocationPermission();
    // closedTheBackgroundTask()
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return () => { unsubscribe() }
  }, [ispaired])



  if (initializing) return (<ActivityIndicator style={{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  }} animating={true} color={MD2Colors.red800} />);

  return (
    <ChildsProvider>
      <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}>
      <Stack.Screen name='SplashScreen' component={PingoSplashScreen} />
        {
          user ?
            (
              <>
                {
                  ispaired ?
                    <Stack.Screen name='Home' component={Home} /> :
                    <Stack.Group>
                      <Stack.Screen name='ChildFormScreen' component={ChildFormScreen}/>
                      <Stack.Screen name='EnterCode' component={EnterCodeScreen} />
                    </Stack.Group>
                }
              </>
            ) :
            <Stack.Screen name="ChildAuth" component={ChildAuthStacks} />
        }
      </Stack.Navigator>
    </ChildsProvider>
  );
});

export default ChildStack;

const styles = StyleSheet.create({
  container: {}
});
