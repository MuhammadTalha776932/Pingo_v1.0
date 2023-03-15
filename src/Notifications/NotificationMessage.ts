import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';


export const getDeviceToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  console.log('Here is Old Token ===> ', fcmToken);

  if (!fcmToken) {
    try {
      let getFCMToken = await messaging().getToken();
      if (getFCMToken) {
        console.log('New Token ===> ', getFCMToken);
        await AsyncStorage.setItem('fcmtoken', getFCMToken);
      }
    } catch (error) {
      console.log(error, 'Error raise at fcmToken');
    }
  }
};

export const notificationListener = async () => {

  messaging().subscribeToTopic('SOS');

  messaging().onMessage(remoteMessage => {
    console.log(remoteMessage, '<==== onMessage');
    Alert.alert("SOS",remoteMessage.notification?.body);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });
};

