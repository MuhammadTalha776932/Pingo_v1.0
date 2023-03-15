import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { AuthContext } from '../../../component/FirebaseManagement/AuthProvider';
import { closedTheBackgroundTask } from '../../../component/Pingo/BackGroundTask/GeolocationTask';
import BottomModals from '../../../component/Pingo/BottomModals';

export const Home = () => {
  const { Signout } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={{...styles.TooltipStyle}}>
        <Chip icon="cancel" 
        mode='outlined'
        onPress={() => closedTheBackgroundTask()}>Want to stop background process?</Chip>
      </View>
      <View style={{...styles.TooltipStyle,marginTop:"10%"}}>
        <Chip icon="cancel" 
        mode='outlined'
        onPress={() => Signout()}>SignOut</Chip>
      </View>
      <BottomModals />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  TooltipStyle: {
    position: "absolute",
    top: 0,
    bottom: 'auto',
    left:"25%",
  }
});
