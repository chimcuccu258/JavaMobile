import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import BottomTabs from '../components/BottomTabs';
import QRScan from '../components/QRScan';
import { windowHeight, windowWidth } from '../utils/dimession';

const HomeScreen = ({route, navigation}) => {
  // const navigation = useNavigation();
  // const phone = route?.params?.phone || '';

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
