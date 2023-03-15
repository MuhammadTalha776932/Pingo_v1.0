import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Divider, Text, useTheme } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import { childCoordinate } from '../../stores/useCoordinateStore';
interface ClickableCardProps {
  title: string | undefined;
  batteryStatus: string | undefined;
  isOnline: boolean | undefined;

  selectKidCoordinate: childCoordinate | undefined;
}

const ClickableCard = ({ title, batteryStatus, isOnline,selectKidCoordinate }:ClickableCardProps) => {
  const { colors } = useTheme();
  const {navigate} = useNavigation();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
      elevation:10
    },
    card: {
      borderRadius: 10,
    },
    titleIcon: {
      color: colors.primary,
      fontSize: 24,
    },
    batteryIcon: {
      color: colors.primary,
      fontSize: 14,
      alignItems: 'center',
      marginHorizontal:10
    },
    body: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    bodyIcon: {
      color: colors.primary,
      fontSize: 24,
      marginRight: 10,
    },
    bodyText: {
      color: colors.primary,
      fontSize: 16,
    },
  });
  

  return (
    <Pressable style={styles.container} onPress={() => navigate("MapContainer" as never,selectKidCoordinate as never)}>
      <Card style={styles.card}>
        <Card.Title
          title={title}
          right={(props) => <Text {...props} style={styles.batteryIcon} >{<Ionicons name='battery-full-outline' size={22}/>} {batteryStatus}</Text>}
        />
        <Divider/>
        <Card.Content style={styles.body}>
          <Text style={styles.bodyText}>{isOnline ? `Location accuracy is ${2} yards` : 'Kid\'s phone is offline'}</Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};


export default ClickableCard;
