import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorThemes } from '../../styles/global.style';
import {useNavigation} from "@react-navigation/native"

interface BottomButtonWithLinkProps {
  buttonText: string,
  linkText: string,

  styling?: boolean
}

const BottomButtonWithLink = ({ buttonText, linkText, styling }: BottomButtonWithLinkProps) => {

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    button: {
      padding: 20,
      borderRadius: 10,
      marginHorizontal: 20,
      marginVertical: 10
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      color: ColorThemes.LinkTextColor,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '900',
      marginVertical: 10

    },
  });

  return (
    <React.Fragment>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5} style={styling ? { ...styles.button,backgroundColor: ColorThemes.ButtonBackground, } : { ...styles.button,backgroundColor: ColorThemes.ButtonBackground1, }}
         onPress={() => {navigation.navigate("Screen One" as never)}}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity ><Text style={styles.text}>{linkText}</Text></TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

export default BottomButtonWithLink;

