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
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {windowHeight, windowWidth} from '../utils/dimession';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors';
import formatPrice from '../utils/formatPrice';

const ProductList = ({menus, images, onProductPress, onPlusIconPress}) => {
  const uniqueListTitles = new Set();

  const uniqueMenus = menus.filter(item => {
    if (!uniqueListTitles.has(item.listTitle)) {
      uniqueListTitles.add(item.listTitle);
      return true;
    }
    return false;
  });

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={menus}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View>
            {index === 0 ||
            menus[index].listTitle !== menus[index - 1].listTitle ? (
              <Text style={styles.listTitle}>{item.listTitle}</Text>
            ) : null}
            <View style={styles.card}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onProductPress(item, index)}>
                <View style={styles.productCard}>
                  <FastImage
                    source={{uri: images[index]}}
                    style={{
                      width: windowWidth * 0.25,
                      height: windowHeight * 0.12,
                      borderRadius: 10,
                    }}
                  />
                  <View style={styles.infoProduct}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        marginTop: 5,
                      }}>
                      {formatPrice(item.price)}đ
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onPlusIconPress(item)}>
                <AntDesign
                  name="pluscircle"
                  size={26}
                  color={colors.mainColor}
                />
              </TouchableOpacity>
            </View>
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
  },
  card: {
    width: windowWidth * 0.945,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCard: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoProduct: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.1,
    backgroundColor: 'white',
    marginLeft: 10,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});
