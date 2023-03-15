import {PermissionsAndroid} from "react-native";
import messaging from '@react-native-firebase/messaging';
import { getDeviceToken } from "../Notifications/NotificationMessage";

export const requestUserPermission = async ()=> {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    AndroidPermissions();
    getDeviceToken();
  }
}
export const AndroidPermissions = async () =>{
    try {
       return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    } catch (error) {
        console.log(error)
    }
}
