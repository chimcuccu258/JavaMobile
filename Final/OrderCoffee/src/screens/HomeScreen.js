import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import WeatherIcon from '../components/WeatherIcon';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import Animated from 'react-native-reanimated';
import MemberCard from '../components/MemberCard';

const HomeScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <WeatherIcon />
      </View>
      <Animated.ScrollView style={styles.contents}>
        <MemberCard />
      </Animated.ScrollView>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: windowWidth * 0.03,
    marginTop: windowHeight * 0.05,
    height: windowHeight * 0.04,
  },
  contents: {
    marginHorizontal: windowWidth * 0.03,
  },
});
