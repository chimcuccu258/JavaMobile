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
import {windowWidth, windowHeight} from '../utils/dimession';
import {colors} from '../assets/colors';
import firestore from '@react-native-firebase/firestore';

const MenuList = ({menus}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={menus}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.menuList} activeOpacity={0.5}>
            <View style={styles.menuBtn}>
              <View style={styles.menuImg}>
                <Image
                  source={require('../assets/images/tch.png')}
                  style={{
                    width: windowWidth * 0.2,
                    height: windowHeight * 0.09,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View style={styles.textBtn}>
                <Text numberOfLines={2} style={{fontSize: 12}}>
                  {item.listTitle}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: windowHeight * 0.15,
  },
  menuList: {
    marginLeft: 15,
    marginTop: 15,
  },
  menuBtn: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.15,
    alignItems: 'center',
  },
  menuImg: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.09,
    backgroundColor: colors.secondaryColor,
    borderRadius: 50,
  },
  textBtn: {
    width: windowWidth * 0.15,
    marginTop: 10,
    alignItems: 'center',
  },
});
