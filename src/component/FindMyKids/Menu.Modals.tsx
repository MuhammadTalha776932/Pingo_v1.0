import * as React from 'react';
import { View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { AuthContext } from '../FirebaseManagement/AuthProvider';
import RSReactNative from "react-native-restart"

const Settings = () => {
    const { Signout } = React.useContext(AuthContext);
    return (
        <View style={
            {
                margin: 0,
            }
        }>
            <List.Section>
                {/* <List.Subheader>Main Settings</List.Subheader> */}
                <List.Item
                    title="Settings"
                    left={(props) => <List.Icon {...props}
                        icon="application-settings" />}
                    onPress={() => { }}
                />
                <List.Item
                    title="Chat"
                    left={(props) => <List.Icon {...props}
                        icon="chat" />}
                    onPress={() => { }}
                />
                <List.Item
                    title="Location"
                    left={(props) => <List.Icon {...props}
                        icon="routes" />}
                    onPress={() => { }}
                />
            </List.Section>
            <Divider />
            <List.Section>
                <List.Item
                    title="Sign Out"
                    left={(props) => <List.Icon {...props}
                        icon="logout" />}
                    onPress={() => {
                        Signout();
                        RSReactNative.restart()
                    }}
                />
                <List.Item
                    title="Help"
                    left={(props) => <List.Icon {...props}
                        icon="help" />}
                    onPress={() => { }}
                />
                <List.Item
                    title="About"
                    left={(props) => <List.Icon {...props}
                        icon="information" />}
                    onPress={() => { }}
                />
            </List.Section>
        </View>
    );
};

export default Settings;