import axios from 'axios';
import {Alert} from 'react-native';
import ChildStores from '../stores/childstores/ChildStore';
import {coordinateContext} from '../stores/useCoordinateStore';
import userStore from '../stores/userStore';

/**
 * sendPostRequest is the function that used to send the request from user route to server controller.
 * It used the axios post request to send the firebase user object with DeviceID or code.
 * @param user object
 * @param deviceID string optional
 * @param code string optional
 * @param childInformation object optional have the childs information like name and age.
 */

export const sendPostRequest = async (
  user: object,
  deviceID?: string,
  code?: string,
  childInformation?: object,
) => {
  try {
    axios
      .post(
        `https://findmykids.cyclic.app/users`,
        {
          data: {
            user,
            deviceID,
            code: code,
            childInfo: {...childInformation} || undefined,
          },
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async res => {
        // this if used to check that res.data have documents of childs.
        if (
          typeof res.data[0] !== 'undefined' &&
          res.data[0]?.deviceID === 'Child' &&
          Object?.keys(res.data[0])?.includes('curr_coordinate')
        ) {
          coordinateContext.updateTheCoordinate(res.data);
          userStore.setIsPaired(res.data[0]?.isPaired);
          return;
        }

        // here we handle the response of child registration which consist of child object that come after the register.
        if (
          typeof res.data !== 'undefined' &&
          res.data[0]?.deviceID === 'Child'
        ) {
          console.log('here we handle the new register child response');
          ChildStores.setIsPaired(res.data[0]?.isPaired);
          ChildStores.setParentCodeIntoStore(res.data[0]?.code);
          return;
        }

        // this if used to check that res.data have simple res that contains the code field in it.
        if (
          typeof res.data !== 'undefined' &&
          Object?.keys(res.data)?.includes('code')
        ) {
          typeof res.data === 'object'
            ? userStore.setIsPairingCode(res.data?.code)
            : userStore.setIsPairingCode(res.data[0]?.code);
          return;
        }
        if (
          (typeof res.data[0] !== 'undefined' &&
            Object?.keys(res.data)?.includes('message')) ||
          Object?.keys(res.data)?.includes('Message')
        ) {
          Alert.alert(
            `Here is the Message ${res.data?.message || res.data?.Message}`,
          );
          return;
        }
      });
  } catch (error) {
    console.log(['Error occured in the SendToServer', error]);
  }
};
