import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react';
// import { UserContext } from '../../../stores/userStore';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import userStore from '../../stores/userStore';


const AddChildScreen = observer(() => {

    const [newChildCode , setNewChildCode] = React.useState<string>("");

    //   const { storePairingCode } = React.useContext(UserContext);
    const handleCopyToClipboard = (code: string) => {
        Clipboard.setString(code);
        Alert.alert('Code copied to clipboard!', `Here is Code ${code}`);
    };
    let { users } = userStore;

    React.useEffect(() => {

        const handleAddChild = async () => {

            try {
                await axios.post("https://findmykids.cyclic.app/parent/code", {
                    data: {
                        user: users._user,
                    },
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => setNewChildCode(response?.data?.code))
            } catch (error) {
                console.log(["Error occurred at the handleAddChild method",error]);
            }

        }
        handleAddChild();
        return () => {

        }
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Text>Enter this code at child's device</Text>
                <TouchableOpacity onPress={() => handleCopyToClipboard(newChildCode)}>
                    <Text style={styles.code}>{newChildCode}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    code: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});

export default AddChildScreen;