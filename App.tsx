import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { requestUserPermission } from "./src/Permissions/Notification.Permission"
import { StackNavigatorScreenNameProvider } from "./src/services/StackScreenNameProvider";
import { Trunk } from './src/stores/useCoordinateStore';
import { UserProvider, UserTrunk } from './src/stores/userStore';
import { ChildsTrunk } from './src/stores/childstores/ChildStore';
import { Stack } from "./src/imports/Global.import";
import { AuthProvider } from './src/component/FirebaseManagement/AuthProvider';
import { ChildStack } from './src/component/Pingo/ChildStack/ChildStack';
import { ParentStack } from './src/component/FindMyKids/ParentStack/ParentStack';
import { ChooseDevicesScreen } from './src/screens/ChooseDevicesScreen';
import { notificationListener } from './src/Notifications/NotificationMessage';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';


/**
 *  1. Here we create the root node which named is App that implement the UserPermission
 * and handle the background notifications is useEfect hook.
 *  2. Rehydrate is the promise that init the mobx stores before used.
 *  3. Hide the SplashScreen.
 *  4. Used the Stack to create the Screen which helped us to switch from parent devices to child devices
 * for testing purpose only.
 *  5. ChooseDevices Stack , Parent Stack and Child Stack.
 *  
 */

function App() {

  const [isVisited, setIsVisited] = useState<string | null>("false");

  const { ChooseDevices, FindMyKids, Pingo } = StackNavigatorScreenNameProvider;

  useEffect(() => {
    (
      async () => {
        try {
          let isVisited: string | null = await AsyncStorage.getItem("isVisited");
          // setIsVisited(isVisited);
        } catch (error) {
          console.error(`Error occurred in the app useeffect method ${error.message}`);
        }
      }
    )();
    requestUserPermission();
    notificationListener();
    (
      async () => {
        await Trunk.init();
        await UserTrunk.init();
        await ChildsTrunk.init();
      }
    )()
    SplashScreen.hide();

    // let {height,width} = Dimensions.get("window");
    let { height, width, fontScale, scale } = Dimensions.get("screen");
    // let {height,width,fontScale,scale} = Dimensions.get("window");
    console.log(`window width ${width} height ${height} ${fontScale} ${scale}`)
  }, []);

  return (
    <AuthProvider>
      <PaperProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={ChooseDevices}
              screenOptions={({ navigation, route }) => ({ header: () => null })}>
              <Stack.Screen
                name={ChooseDevices}
                component={ChooseDevicesScreen}
              />
              <Stack.Screen name={FindMyKids} component={ParentStack} initialParams={{ isVisited }} />

              <Stack.Screen name={Pingo} component={ChildStack} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
