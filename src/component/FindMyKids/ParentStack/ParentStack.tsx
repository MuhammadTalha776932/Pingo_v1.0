//#region Import external and internal libraries here
import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapsContainer from '../../../screens/FindMyKids/FindMyKids.MapsContainer';
import AuthStacks from '../../AuthStack/AuthStacks';
import { AuthContext } from '../../FirebaseManagement/AuthProvider';
import auth from "@react-native-firebase/auth"
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { sendPostRequest } from '../../../Helper/SendToServer';
import { CoordinateProviderComponent } from '../../../stores/useCoordinateStore';
import { observer } from 'mobx-react';
import { UserContext } from '../../../stores/userStore';
import MultipleChildScreen from '../../../screens/FindMyKids/FindMyKids.MultipleChildScreen';
import AddChildStack from './AddChildStack';
import { Stack } from '../../../imports/Global.import';
import CodeGenerateScreen from '../../../screens/FindMyKids/FindMyKids.CodeGenerateScreen';
import WelcomeScreen from '../../../screens/FindMyKids/FindMyKids.Welcome.screen';
import SharedLinkScreen from '../../../screens/FindMyKids/FindMyKids.SharedLinkScreen';
import { OnboardingStack } from './OnboardingStack';
//#endregion
/**
 * ParentStack is the mobx observalbe component that contains the other stacks components
 * 
 * Flow: if User(Not Authenticated) => AuthStack(After Authenticated) => (AfterAuthenticate)=>
 * if isPaied( 1.true | 2.false) => 1. MultiChildScreenStack() => MapContainer(selected Childs)
 *                      |
 *                      => 2. CodeScreen(isPaird:true) => MultiChildScreenStack => MapContainer(selected Childs)
 */

export const ParentStack = observer(({ route }: { route: any }): JSX.Element => {
  const { user, setUser, Signout } = React.useContext(AuthContext);
  const { ispaired, updateData } = React.useContext(UserContext);
  const [isLogout, setIsLogout] = React.useState(false);

  const [isVisited, setIsVisited] = React.useState<string | null>(route.params.isVisited)

  const [initializing, setInitializing] = React.useState(true);

  const onAuthStateChanged = (user: any) => {
    if (user) {
      setUser(user);
      updateData(user);
      if (user) sendPostRequest(user, "Parent");
    }
    else {
      setIsLogout(true);
    }
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    setIsVisited(route.params.isVisited)
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return () => { unsubscribe() }; // unsubscribe on unmount
  }, []);


  if (
    initializing) return <ActivityIndicator style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignSelf: "center"
    }} animating={true} color={MD2Colors.red800} />;

  return (
    <CoordinateProviderComponent>
      <Stack.Navigator  screenOptions={({ navigation, route }) => ({ header: () => null })}>
        {
          isVisited === "false" || isVisited === null ? (
            <>
              <Stack.Screen name='WelcomeScreen' component={OnboardingStack} />
            </>
          ) : (
            <>
              {
                user && ispaired ?
                  (<>
                    <Stack.Group>
                      <Stack.Screen name="multi-child" component={MultipleChildScreen} />
                      <Stack.Screen name="addChilds" children={() => <AddChildStack />} />
                      <Stack.Screen name='MapContainer' component={MapsContainer} />
                    </Stack.Group>
                  </>) :
                  (
                    <>
                      {
                        !user ?
                          <Stack.Screen name="Auth" component={AuthStacks} /> :
                          (
                            <>
                              {
                                ispaired ?
                                  <Stack.Group>
                                    <Stack.Screen name="multi-child" component={MultipleChildScreen} />
                                    <Stack.Screen name="addChilds" children={() => <AddChildStack />} />
                                    <Stack.Screen name='MapContainer' component={MapsContainer} />
                                  </Stack.Group>
                                  :
                                  <Stack.Screen name='SecratCode' component={CodeGenerateScreen} />
                              }
                            </>
                          )
                      }
                    </>
                  )
              }
            </>
          )
        }
      </Stack.Navigator>
    </CoordinateProviderComponent>
  );
});

export default ParentStack;

const styles = StyleSheet.create({
  container: {}
});
