import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const NewsExpand = ({route}) => {
  const navigation = useNavigation();
  const {newsData, newsImages} = route.params;

  const matchedNews = newsData.map((news, index) => ({
    ...news,
    imageUrl: newsImages[index],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContents}>
          <View style={styles.headerDetails}>
            <Text
              style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
              Khám phá thêm ✨
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={matchedNews}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('NewsDetails', {item})}>
            <View style={styles.newsBox}>
              <View style={styles.imageBox}>
                <FastImage
                  source={{uri: item.imageUrl}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    objectFit: 'cover',
                  }}
                />
              </View>
              <Text style={styles.newsType}>Ưu đãi đặt biệt</Text>
              <Text
                style={styles.newsTitle}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.title}
              </Text>
              <View style={styles.newsTime}>
                <Ionicons
                  name="calendar-outline"
                  size={13}
                  color={colors.darkGray}
                />
                <Text style={styles.newsDate}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NewsExpand;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: windowHeight * 0.1125,
    borderBottomWidth: 0.5,
    borderBottomColor: '#BDBDBD',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  headerContents: {
    marginTop: 40,
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  headerDetails: {
    width: windowWidth * 0.93,
    justifyContent: 'center',
    position: 'absolute',
  },
  newsBox: {
    marginTop: 15,
    marginBottom: 20,
    width: windowWidth * 0.45,
    height: windowHeight * 0.25,
    borderRadius: 10,
    marginLeft: windowWidth * 0.03,
    marginRight: 5,
  },
  imageBox: {
    height: windowHeight * 0.15,
  },
  newsType: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 10,
  },
  newsTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5,
  },
  newsTime: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsDate: {
    fontSize: 11,
    color: colors.darkGray,
    marginLeft: 5,
  },
});
