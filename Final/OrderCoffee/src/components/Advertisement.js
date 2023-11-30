import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../utils/dimession';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

const Advertisement = ({userData}) => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImage = async () => {
      try {
        const imageRef = await firebase.storage().ref('AdsImage/').listAll();
        const urls = await Promise.all(
          imageRef.items.map(async ref => await ref.getDownloadURL()),
        );
        setImages(urls);
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error);
      }
    };

    getImage();
  }, []);

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={styles.container}
      renderItem={({item}) => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Order', userData)}>
          <FastImage
            source={{uri: item}}
            style={{
              width: windowWidth * 0.941,
              height: windowHeight * 0.25,
              borderRadius: 10,
              objectFit: 'cover',
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default Advertisement;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: windowWidth * 0.94,
    height: windowHeight * 0.245,
    borderRadius: 10,
    marginHorizontal: windowWidth * 0.03,
  },
});
