import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const OtherScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View>
        <Text style={styles.title}>Tiện ích</Text>
        <View style={styles.rowBtn}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
            <View style={styles.textGroup}>
              <MaterialCommunityIcons
                name="order-bool-descending-variant"
                size={windowWidth * 0.065}
                color={colors.mainColor}
              />
              <Text style={styles.textBtn}>Lịch sử đơn hàng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
            <View style={styles.textGroup}>
              <MaterialCommunityIcons
                name="star-check-outline"
                size={windowWidth * 0.065}
                color={'green'}
              />
              <Text style={styles.textBtn}>Đánh giá đơn hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Tài khoản</Text>
        <View style={styles.list}>
          <TouchableOpacity style={styles.btnList} activeOpacity={0.5}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={windowWidth * 0.035} />
              <Text style={{fontSize: windowWidth * 0.032, marginLeft: 10}}>
                Thông tin tài khoản
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnList} activeOpacity={0.5}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="settings" size={windowWidth * 0.035} />
              <Text style={{fontSize: windowWidth * 0.032, marginLeft: 10}}>
                Cài đặt
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnList} activeOpacity={0.5}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="log-out" size={windowWidth * 0.035} />
              <Text style={{fontSize: windowWidth * 0.032, marginLeft: 10}}>
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.03,
  },
  header: {
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: windowWidth * 0.04,
  },
  rowBtn: {
    marginVertical: windowHeight * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: (windowWidth * 0.9) / 2,
    height: windowHeight * 0.08,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  textGroup: {
    padding: 10,
  },
  textBtn: {
    fontSize: windowWidth * 0.032,
    marginTop: windowHeight * 0.01,
  },
  list: {
    marginVertical: windowHeight * 0.02,
  },
  btnList: {
    width: windowWidth - windowWidth * 0.06,
    height: windowHeight * 0.05,
    marginBottom: windowHeight * 0.01,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
  },
});
