import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
  Switch,
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

const Setting = () => {
  const navigation = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleSwitchChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContents}>
          <View style={styles.headerDetails}>
            <Text
              style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
              Cài đặt
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
          <View style={styles.switchContainer}>
            <MaterialCommunityIcons name="bell-outline" size={20} />
            <Text style={styles.switchText}>Nhận thông báo</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleSwitchChange}
              style={{marginLeft: 'auto'}}
            />
          </View>
        </ScrollView>
      </>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 10,
    marginHorizontal: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  switchText: {
    fontSize: 14,
    marginLeft: 10,
  },
});
