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
import advertisement from '../assets/advertisement';

const Advertisement = props => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={props.images}
      keyExtractor={(item, index) => index.toString()}
      // keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={styles.container}
      renderItem={({item}) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Order', props)}>
          <FastImage
            source={{uri: item}}
            // source={item.image}
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
