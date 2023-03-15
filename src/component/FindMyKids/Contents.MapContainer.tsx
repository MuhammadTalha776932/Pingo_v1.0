import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';

export const Contents = () => {
    const [locationName, setLocationName] = React.useState('');
    return (
        <>
            <View style={{ ...styles.ViewContainer }}>
                <Text style={{ ...styles.TitleStyle }}>Get updates on your child's location</Text>
                <Text style={{ ...styles.SubTitleStyle }}>Add the places your child visits. For example Home, School, and daycare.</Text>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <IconButton
                            icon="home"
                            iconColor={"#2196F3"}
                            size={28}
                            style={styles.iconButton}
                            onPress={() => console.log('Pressed')}
                        />
                        <IconButton
                            icon="routes"
                            iconColor={"#2196F3"}
                            size={28}
                            style={styles.iconButton}
                            onPress={() => console.log('Pressed')}
                        />
                        <IconButton
                            icon="school"
                            iconColor={"#2196F3"}
                            size={28}
                            style={styles.iconButton}
                            onPress={() => console.log('Pressed')}
                        />
                    </View>
                    <TextInput
                        label="Location"
                        value={locationName}
                        onChangeText={setLocationName}
                        placeholder="Home"
                        underlineColor="transparent"
                        style={styles.input}
                    />
                    <Button
                        mode="contained"
                        onPress={() => console.log('Create location button pressed')}
                        style={styles.button}
                        labelStyle={styles.buttonText}
                    >
                        Create a location
                    </Button>
                </View>
            </View>
        </>
    );
};

export default Contents;


const styles = StyleSheet.create({
    ViewContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    TitleStyle: {
        marginTop: 20,
        fontSize: 20,
        textAlign: "center"
    },
    SubTitleStyle: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center"
    },
    ButtonStyle: {
        marginHorizontal: "auto",
        bottom: 0,
        backgroundColor: 'blue'
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    iconButton: {
        backgroundColor: '#fff',
        margin: 4,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    button: {
        backgroundColor: '#2196F3',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
    },
})