import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapsContainer from "../screens/FindMyKids/FindMyKids.MapsContainer";
import {Text,View} from "react-native"
import FontAwesome5 from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator();

const RouteTab = () => {
  return (<View>
    <Text>
      Route
    </Text>
  </View>)
}
export function BottomTabNavigation() {
  return (
    <Tab.Navigator initialRouteName='main' detachInactiveScreens={false} screenOptions={
      ({navigation,route})=>({
        tabBarIcon:({focused,color,size})=>{
          let icoName = "";
          if (route.name === "createLocation") {
            icoName ="location-sharp"
            size=focused? 30 : 25
            color= focused? "green":"black"
          }
          else if (route.name === "routes") {
            icoName="navigate-circle-sharp"
            size=focused? 30 : 25
            color= focused? "green":"black"
          }
          else if (route.name === "main") {
            icoName ="add-circle-sharp"
            size=focused? 30 : 25
            color= focused? "green":"black"
          }
          else if (route.name === "surrounding") {
            icoName ="mic-sharp"
            size=focused? 30 : 25
            color= focused? "green":"black"
          }
          else if (route.name === "setting") {
            icoName ="settings-sharp"
            size=focused? 30 : 25
            color= focused? "green":"black"
          }
          return (
            <FontAwesome5 name={icoName} size={size} color={color}/>
          )
        },
        tabBarLabel:()=>null
      })
      
      }>
      <Tab.Screen name="createLocation" component={RouteTab} />
      <Tab.Screen name="routes" component={RouteTab} />
      <Tab.Screen options={{header:()=>null}} name="main" component={MapsContainer} />
      <Tab.Screen name="surrounding" component={RouteTab} />
      <Tab.Screen name="setting" component={RouteTab} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;