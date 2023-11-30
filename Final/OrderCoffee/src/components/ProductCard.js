import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {windowHeight, windowWidth} from '../utils/dimession';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../assets/colors';

const ProductCard = () => {
  return (
    <View style={styles.productCard}>
      <Image
        source={require('../assets/images/tch.png')}
        style={{
          width: windowWidth * 0.25,
          height: windowHeight * 0.12,
          borderRadius: 10,
        }}
      />
      <View style={styles.infoProduct}>
        <Text style={{fontSize: 14}}>Product Name</Text>
        <Text style={{fontSize: 14}}>Product Price</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name="pluscircle" size={26} color={colors.mainColor} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    width: windowWidth * 0.945,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoProduct: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    backgroundColor: 'white',
    marginLeft: 10,
  },
});