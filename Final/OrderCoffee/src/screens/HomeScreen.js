import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import WeatherIcon from '../components/WeatherIcon';
import { windowHeight, windowWidth } from '../utils/dimession';
import { colors } from '../assets/colors';

const HomeScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <WeatherIcon />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.03,
    backgroundColor: colors.white,
  },
  header: {
    marginTop: windowHeight * 0.05,
  },
});
