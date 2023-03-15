import BackgroundService from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import ChildStores from '../../../stores/childstores/ChildStore';

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 45000,
  },
};
export const sleep = (time: any) =>
  new Promise(resolve => setTimeout(() => resolve(null), time));

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).
export const SendCoordinates = async (taskDataArguments: any) => {
  try {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let index = 0; BackgroundService.isRunning(); index++) {
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude, accuracy, altitude, heading, speed} =
              position.coords;
            await axios.post(
              'https://findmykids.cyclic.app/child/coordinate',
              {
                data: {
                  latitude,
                  longitude,
                  accuracy,
                  altitude,
                  heading,
                  speed,
                  code: ChildStores.storeEnterCode,
                },
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
        );
        await BackgroundService.updateNotification({
          taskDesc: `Location Tracker running ${index}`,
        });
        await sleep(delay);
      }
    });
  } catch (error) {
    console.log(["Error occured in SendCoordinates route",error]);
  }
  // Example of an infinite loop task
};

export const handleBackground = async () => {
  await BackgroundService.start(SendCoordinates, options);
  await BackgroundService.updateNotification({
    taskDesc: 'Location Tracker running',
  }); // Only Android, iOS will ignore this call
  // iOS will also run everything here in the background until .stop() is called
};

export const closedTheBackgroundTask = async () => {
  await BackgroundService.stop();
};
