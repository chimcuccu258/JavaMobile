import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-virtualized-view';

const OtherScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    firstName: null,
    lastName: null,
  });

  const touchLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Onboarding');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchDataOnFocus = async () => {
        // setRefreshing(true);
        // setIsLoading(true);
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const handleUpdate = async () => {
  //   try {
  //     const user = auth().currentUser;

  //     if (user) {
  //       const querySnapshot = await firestore()
  //         .collection('TblUsers')
  //         .where('phone', '==', user.phoneNumber)
  //         .get();

  //       if (!querySnapshot.empty) {
  //         const docRef = querySnapshot.docs[0].ref;
  //         const userData = {
  //           lastName,
  //           firstName,
  //         };

  //         await docRef.update(userData);

  //         Alert.alert('Thông báo', 'Cập nhật thông tin thành công 🎉', [
  //           {
  //             text: 'OK',
  //             onPress: () => console.log('OK Pressed'),
  //           },
  //         ]);

  //         setIsButtonActive(false);
  //       } else {
  //         console.error('No user data found');
  //       }
  //     } else {
  //       console.error('No user found');
  //     }
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //   }
  // };

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
          <TouchableOpacity
            style={styles.btnList}
            onPress={() => navigation.navigate('UserDetails', {userData})}
            activeOpacity={0.5}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={18} />
              <Text style={{fontSize: 14, marginLeft: 10}}>
                Thông tin tài khoản
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnList}
            onPress={() => navigation.navigate('Setting')}
            activeOpacity={0.5}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="settings" size={18} />
              <Text style={{fontSize: 14, marginLeft: 10}}>Cài đặt</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnList}
            activeOpacity={0.5}
            onPress={touchLogout}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="log-out" size={18} />
              <Text style={{fontSize: 14, marginLeft: 10}}>Đăng xuất</Text>
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
    height: windowHeight * 0.1,
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
    padding: 15,
  },
  textBtn: {
    fontSize: 14,
    marginTop: windowHeight * 0.01,
  },
  list: {
    marginVertical: windowHeight * 0.02,
  },
  btnList: {
    width: windowWidth - windowWidth * 0.06,
    height: windowHeight * 0.055,
    marginBottom: windowHeight * 0.01,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
  },
});
