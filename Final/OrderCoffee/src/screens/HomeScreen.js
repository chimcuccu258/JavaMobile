import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import WeatherIcon from '../components/WeatherIcon';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import MemberCard from '../components/MemberCard';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import Advertisement from '../components/Advertisement';
import News from '../components/News';

const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    firstName: null,
    lastName: null,
  });
  const phone = route?.params?.phone || '';

  useEffect(() => {
    const getUserData = async () => {
      const user = auth().currentUser;

      if (user) {
        try {
          const querySnapshot = await firestore()
            .collection('TblUsers')
            .where('phone', '==', user.phoneNumber)
            .get();
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserData(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    getUserData();
  }, []);

  const greetingMessage = userData.firstName
    ? `Chào, ${userData.firstName}`
    : 'Chào bạn';

  return (
    <View style={styles.container}>
      <Animated.ScrollView style={styles.contents}>
        <View style={styles.header}>
          <WeatherIcon />
          <View>
            <Text style={styles.greeting}>{greetingMessage}</Text>
          </View>
        </View>

        <MemberCard userData={userData} style={styles.MemberCard} />
        <Advertisement userData={userData} />
        <News userData={userData}/>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginHorizontal: windowWidth * 0.03,
    marginTop: windowHeight * 0.04,
    marginBottom: windowHeight * 0.02,
    height: windowHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
  },
});
