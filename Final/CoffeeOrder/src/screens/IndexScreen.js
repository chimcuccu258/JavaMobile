import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {colors} from '../assets/colors';
import {windowHeight, windowWidth} from '../utils/dimession';
import {useNavigation} from '@react-navigation/native';

const IndexScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background_1.jpg')}
        resizeMode="cover"
        blurRadius={3.5}
        style={styles.image}>
        <Image
          source={require('../assets/images/logo_color.png')}
          style={{width: '40%', height: '20%', resizeMode: 'contain'}}
        />
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 16,
              color: colors.mainColor,
              fontWeight: 'bold',
            }}>
            Enter phone number to login
          </Text>
        </View>
        <View style={styles.phoneInput}>
          <PhoneInput
            defaultValue={phone}
            defaultCode={'VN'}
            withShadow
            containerStyle={{width: '100%'}}
            onChangeFormattedText={text => {
              setPhone(text);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => navigation.navigate('Authentication')}
          activeOpacity={0.5}>
          <Text style={{color: colors.white, fontSize: 14, fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <View style={styles.spacer} />
          <View style={styles.line} />
          <Text style={styles.text}>Hoặc</Text>
          <View style={styles.line} />
          <View style={styles.spacer} />
        </View>
        <TouchableOpacity style={styles.btn1} activeOpacity={0.5}>
          <View style={styles.btnContent}>
            <Image
              source={require('../assets/images/apple3.png')}
              style={styles.appleImage}
            />
            <Text style={styles.btnText}>Tiếp tục bằng Apple</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2} activeOpacity={0.5}>
          <View style={styles.btnContent}>
            <Image
              source={require('../assets/images/facebook(@3×).png')}
              style={styles.appleImage}
            />
            <Text style={styles.btnText}>Tiếp tục bằng Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn3} activeOpacity={0.5}>
          <View style={styles.btnContent}>
            <Image
              source={require('../assets/images/google3.png')}
              style={styles.appleImage}
            />
            <Text style={styles.btnText}>Tiếp tục bằng Facebook</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 20,
  },
  phoneInput: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: windowWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
  },
  spacer: {
    flex: 1,
  },
  line: {
    backgroundColor: colors.white,
    height: 0.7,
    width: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginHorizontal: 10,
  },
  btn1: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    marginBottom: 10,
  },
  btn2: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0866ff',
    marginBottom: 10,
  },
  btn3: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 10,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appleImage: {
    width: '10%',
    height: '100%',
    resizeMode: 'contain',
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});
