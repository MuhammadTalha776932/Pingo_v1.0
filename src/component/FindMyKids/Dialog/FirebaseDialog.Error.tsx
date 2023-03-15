import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export const ErrorDialog = () => {
  const [visible, setVisible] = React.useState(false);
  const [errorMessages,setErrorMessage] = React.useState(null);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  React.useEffect(()=>{
    const fetchErrorFromLocalStorage = async () =>{
        let Error =  await AsyncStorage.getItem("@SignInError");
        setErrorMessage(Error as null);
    }
  },[errorMessages])

  return (
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{errorMessages}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
  );
};


export default ErrorDialog;