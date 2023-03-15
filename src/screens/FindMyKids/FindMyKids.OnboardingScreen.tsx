import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native"

interface OnboardingScreenProps {
    title: string,
    navigateToScreen: string,
}

const OnboardingScreen = (props: OnboardingScreenProps) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>{props.title}</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate(props.navigateToScreen as never)
            }}>
                <Text>{props.navigateToScreen}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {}
});
