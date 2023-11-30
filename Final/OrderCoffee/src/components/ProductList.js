import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import firestore from '@react-native-firebase/firestore';
import {windowHeight, windowWidth} from '../utils/dimession';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors';

const ProductList = ({menus}) => {
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={menus}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View>
            {item.menuItems.map((menuItem, index) => (
              <TouchableOpacity key={index} activeOpacity={0.8}>
                <View style={styles.productCard}>
                  <Image
                    source={require('../assets/images/tch.png')} //image
                    style={{
                      width: windowWidth * 0.25,
                      height: windowHeight * 0.12,
                      borderRadius: 10,
                    }}
                  />
                  <View style={styles.infoProduct}>
                    <Text style={{fontSize: 14}}>{menuItem.title}</Text>
                    <Text style={{fontSize: 14}}>{menuItem.price}</Text>
                  </View>
                  <TouchableOpacity activeOpacity={0.8}>
                    <AntDesign
                      name="pluscircle"
                      size={26}
                      color={colors.mainColor}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    // backgroundColor: 'red',
  },
  productCard: {
    width: windowWidth * 0.945,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoProduct: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    backgroundColor: 'white',
    marginLeft: 10,
  },
});
