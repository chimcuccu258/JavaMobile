import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {colors} from '../assets/colors';
import {windowHeight, windowWidth} from '../utils/dimession';
import { useNavigation } from '@react-navigation/native';

const IndexScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize: 16}}>Enter phone number to login</Text>
        </View>
        <PhoneInput
          defaultValue={phone}
          defaultCode={'VN'}
          withShadow
          containerStyle={{width: '100%'}}
          onChangeFormattedText={text => {
            setPhone(text);
          }}
        />
        <TouchableOpacity
          style={styles.btnLogin}
          // onPress={() => navigation.navigate('Authentication')}
          activeOpacity={0.5}>
          <Text style={{color: colors.white, fontSize: 16, fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Authentication')}
          style={{ marginTop: 20, }}>
          <Text>Authentication</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight,
    width: windowWidth,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
  },
  btnLogin: {
    marginTop: 20,
    padding: 20,
    borderRadius: 30,
    width: windowWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
  },
});
