import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../../../utils/dimession';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../assets/colors';
import Share from 'react-native-share';
import {firebase} from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

const NewsDetails = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params;

  const handleSharePress = () => {
    Share.open({
      url: 'https://www.google.com/',
      subject: 'Share Link',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

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

  const [cover, setCover] = useState([]);

  useEffect(() => {
    const getCover = async () => {
      try {
        const coverRef = await firebase.storage().ref('CoverImage/').listAll();
        const urls = await Promise.all(
          coverRef.items.map(async ref => await ref.getDownloadURL()),
        );
        setCover(urls);
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error);
      }
    };

    getCover();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContents}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={26} color="black" />
          </TouchableOpacity>
          <View style={styles.headerDetails}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{fontWeight: '700', fontSize: 15}}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={handleSharePress}>
            <Ionicons name="share-outline" size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.headerSection1}>{item.title}</Text>
        </View>
        <View style={styles.cover}>
          <FastImage
            source={{uri: item.imageUrl}}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </View>
        <View>
          <Text style={styles.sectionText}>{item.section1}</Text>
          <Text style={styles.sectionText}>{item.section2}</Text>
        </View>
        <View style={styles.cover2}>
          <FastImage
            source={{uri: item.imageUrl}}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </View>
        <View>
          <Text style={styles.footerText}>MÌNH CÀ PHÊ NHÉ!</Text>
          <Text style={styles.footerText}>👉 Chốt đơn ngay </Text>
          <Text style={styles.footerText}>👉 Điện thoại: 18006936</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.foot}>
            Trang Tin tức - The Coffee House © 2023
          </Text>
          <Text style={styles.foot}>
            Latest Posts • Facebook • Twitter • Ghost
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  header: {
    height: windowHeight * 0.095,
    borderBottomWidth: 0.5,
    borderBottomColor: '#BDBDBD',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  headerDetails: {
    width: windowWidth * 0.74,
  },
  headerContents: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSection1: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: '500',
    fontFamily: 'Times New Roman',
    marginHorizontal: 15,
  },
  cover: {
    marginTop: 30,
    width: windowWidth,
    height: windowHeight * 0.225,
  },
  cover2: {
    marginTop: 30,
    width: windowWidth * 0.9,
    height: windowHeight * 0.23,
    marginHorizontal: windowWidth * 0.05,
  },
  sectionText: {
    fontSize: 15,
    marginHorizontal: 15,
    marginTop: 20,
    lineHeight: 25,
    fontFamily: 'Times New Roman',
    fontWeight: 'light',
  },
  footer: {
    marginTop: 30,
    width: windowWidth,
    height: windowHeight * 0.14,
    backgroundColor: colors.black,
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 15,
    marginHorizontal: 15,
    marginTop: 20,
    lineHeight: 20,
    fontFamily: 'Times New Roman',
    fontWeight: 'light',
  },
  foot: {
    color: colors.lightGray,
    fontFamily: 'Times New Roman',
    fontWeight: 'light',
    lineHeight: 25,
  },
});
