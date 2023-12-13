import {View, Text, StyleSheet, Image, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import WeatherIcon from '../../components/WeatherIcon';
import {windowHeight, windowWidth} from '../../utils/dimession';
import {colors} from '../../assets/colors';
import MemberCard from './Components/MemberCard';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import Advertisement from './Components/Advertisement';
import News from './Components/News';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // tự động refresh khi focus
  useFocusEffect(
    useCallback(() => {
      const fetchDataOnFocus = async () => {
        // setRefreshing(true);
        setIsLoading(true);
        try {
          await fetchData();
        } catch (error) {
          console.error('Error fetching data on focus:', error);
        } finally {
          // setIsLoading(false);
          // setRefreshing(false);
        }
      };

      fetchDataOnFocus();
    }, []),
  );

  useEffect(() => {
    fetchData();
  }, []);

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

      // ADVERTISMENT
      // lấy hình từ AsyncStorage nếu có
      const cachedImages = await AsyncStorage.getItem('cachedImages');

      if (cachedImages) {
        const cachedImagesArray = JSON.parse(cachedImages);
        setImages(cachedImagesArray);
      } else {
        // ko có thì lấy từ fb_storage
        const imageRef = await firebase.storage().ref('AdsImage/').listAll();
        const urls = await Promise.all(
          imageRef.items.map(async ref => await ref.getDownloadURL()),
        );
        // lưu lại mai dùng tiếp
        await AsyncStorage.setItem('cachedImages', JSON.stringify(urls));
        setImages(urls);
      }

      // NEWS
      // lấy doc
      const snapshot = await firestore().collection('TblNews').get();
      const newsArray = snapshot.docs.map(doc => doc.data());
      setNewsData(newsArray);

      // lấy hình từ AsyncStorage nếu có
      const cacheNewsImage = await AsyncStorage.getItem('cacheNewsImage');

      if (cacheNewsImage) {
        const cacheNewsImageArray = JSON.parse(cacheNewsImage);
        setNewsImages(cacheNewsImageArray);
      } else {
        // ko có thì lấy từ fb_storage
        const imageRef = await firebase.storage().ref('NewsImage/').listAll();
        const urls = await Promise.all(
          imageRef.items.map(async ref => await ref.getDownloadURL()),
        );
        // lưu lại mai dùng tiếp
        await AsyncStorage.setItem('cacheNewsImage', JSON.stringify(urls));
        setNewsImages(urls);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const greetingMessage = userData.firstName
    ? `Chào, ${userData.firstName}`
    : 'Chào bạn';

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <WeatherIcon />
          <View>
            <Text style={styles.greeting}>{greetingMessage}</Text>
          </View>
        </View>
        <MemberCard userData={userData} style={styles.MemberCard} />
        {isLoading || refreshing ? (
          <View style={styles.loadingContainer}>
            <LottieView
              source={require('../../assets/animations/christmas.json')}
              style={{width: windowWidth * 0.5, height: windowWidth * 0.5}}
              autoPlay
              loop
              withTiming
            />
          </View>
        ) : (
          <>
            <Advertisement userData={userData} images={images} />
            <News newsData={newsData} newsImages={newsImages} />
          </>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: windowHeight,
  },
  header: {
    marginHorizontal: windowWidth * 0.03,
    marginBottom: windowHeight * 0.02,
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
