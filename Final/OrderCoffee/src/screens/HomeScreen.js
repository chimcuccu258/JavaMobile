import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import { ActivityIndicator } from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const phone = route?.params?.phone || '';

  const [userData, setUserData] = useState({
    firstName: null,
    lastName: null,
  });
  const [images, setImages] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [newsImages, setNewsImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebase.auth().currentUser;

        if (user) {
          const querySnapshot = await firestore()
            .collection('TblUsers')
            .where('phone', '==', user.phoneNumber)
            .get();

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserData(userData);
          }
        }

        const imageRef = await firebase.storage().ref('AdsImage/').listAll();
        const urls = await Promise.all(
          imageRef.items.map(async ref => await ref.getDownloadURL()),
        );
        setImages(urls);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    const fetchNewsData = async () => {
      try {
        const snapshot = await firestore().collection('TblNews').get();
        const newsArray = snapshot.docs.map(doc => doc.data());
        setNewsData(newsArray);

        const imageRef = await firebase.storage().ref('NewsImage/').listAll();
        const urls = await Promise.all(
          imageRef.items.map(async ref => await ref.getDownloadURL()),
        );
        setNewsImages(urls);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
    fetchNewsData();
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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="gray" />
          </View>
        ) : (
          <>
            <Advertisement userData={userData} images={images} />
            <News newsData={newsData} newsImages={newsImages} />
          </>
        )}
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.5,
  },
});
