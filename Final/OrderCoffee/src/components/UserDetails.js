import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import {ScrollView} from 'react-native-virtualized-view';

const UserDetails = ({route}) => {
  const navigation = useNavigation();
  const {userData} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContents}>
          <View style={styles.headerDetails}>
            <Text
              style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
              Cập nhật thông tin
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <>
        <ScrollView style={styles.body}>
          <TouchableOpacity activeOpacity={0.5} style={styles.inputField}>
            <TextInput>{userData.firstName}</TextInput>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.inputField}>
            <TextInput>{userData.lastName}</TextInput>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.inputField, {backgroundColor: '#dddddd'}]}>
            <TextInput editable={false}>{userData.email}</TextInput>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.inputField, {backgroundColor: '#dddddd'}]}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <TextInput editable={false}>{userData.dob}</TextInput>
              <MaterialCommunityIcons
                name="calendar-text"
                size={18}
                color={colors.darkGray}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.showActionSheet}
            style={styles.inputField}>
            <Text>{userData.gender ? 'Nữ' : 'Nam'}</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} style={styles.submitBtn}>
            <Text style={{color: 'white'}}>Cập nhật tài khoản</Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    </View>
  );
};

export default UserDetails;

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
  body: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 15,
  },
  inputField: {
    width: windowWidth * 0.93,
    height: windowHeight * 0.06,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    marginBottom: 20,
  },
  submitBtn: {
    width: windowWidth * 0.93,
    height: windowHeight * 0.06,
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
