import BackgroundService from 'react-native-background-actions';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import {coordinateContext} from '../../../stores/useCoordinateStore';
import userStore from '../../../stores/userStore';

export const options = {
  taskName: 'Notifications',
  taskTitle: 'Background Task',
  taskDesc: 'Handle the Notifications',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 30000,
  },
};
export const sleep = (time: any) =>
  new Promise(resolve => setTimeout(() => resolve(null), time));

/**
 * SeekingNotification is a function that running at background as process and handle the notification.
 * @param taskDataArguments any
 */
export const SeekingNotification = async (taskDataArguments: any) => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let index = 0; BackgroundService.isRunning(); index++) {
      // code here for notification handler
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log(remoteMessage.notification, '<=== notification');
      });

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      await sleep(delay);
    }
  });
};

export const handleBackgroundNotifications = async () => {
  await BackgroundService.start(SeekingNotification, options);
  await BackgroundService.updateNotification({
    taskDesc: '',
  }); // Only Android, iOS will ignore this call
  // iOS will also run everything here in the background until .stop() is called
};

export const stopBackgroundNotifications = async () => {
  await BackgroundService.stop();
};

// Background task for fetching child locations.

const optionsLoaction = {
  taskName: 'Locations',
  taskTitle: 'Update the Locations',
  taskDesc: 'Fetch the Childs location',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 35000,
  },
};

export const fetchNewChildLocation = async (taskDataArguments: any) => {
  // Example of an infinite loop task
  try {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      let {users, storePairingCode} = userStore;
      for (let index = 0; BackgroundService.isRunning(); index++) {
        axios
          .post(
            `https://findmykids.cyclic.app/parent/coordinate`,
            {
              data: {
                user: users._user,
                code: storePairingCode,
              },
              deviceID: 'Parent',
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              timeout: 60000,
            },
          )
          .then(async res => {
            if (res.data[0].deviceID === 'Child') {
              coordinateContext.updateTheCoordinate(res.data);
            }
            // console.log(['===>', coordinateContext.CoordinateState[0]]);
          });
          await BackgroundService.updateNotification({
            taskDesc: `Fetching child Coordinates ${index}`,
          }); // Only Android, iOS will ignore this call
        await sleep(delay);
      }
    });
  } catch (e) {
    console.error(e);
  }
};

export const ChildLocationOptions = {
  taskName: 'Locations',
  taskTitle: 'Update the Locations',
  taskDesc: 'Fetch the Childs location',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 35000,
  },
};

export const handleFNChildLocation = async () => {
  await BackgroundService.start(fetchNewChildLocation, ChildLocationOptions);
  await BackgroundService.updateNotification({
    taskDesc: 'Fetching child Coordinates',
  }); // Only Android, iOS will ignore this call
  // iOS will also run everything here in the background until .stop() is called
};

export const stopBackgroundChildLocation = async () => {
  await BackgroundService.stop();
};
