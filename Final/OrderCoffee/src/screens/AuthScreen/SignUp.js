import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../../utils/dimession';
import {colors} from '../../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContents}>
          <View style={styles.headerDetails}>
            <Text
              style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
              Tạo tài khoản
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
          <TextInput style={styles.inputField} placeholder="Họ" />
          <TextInput style={styles.inputField} placeholder="Tên" />
          <TextInput style={styles.inputField} placeholder="Email" />
          <TextInput style={styles.inputField} placeholder="Ngày sinh" />
          <TextInput style={styles.inputField} placeholder="Giới tính" />
        </ScrollView>
      </>
    </View>
  );
};

export default SignUp;

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
    width: windowWidth * 0.92,
    height: windowHeight * 0.06,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    marginBottom: 20,
  },
});
