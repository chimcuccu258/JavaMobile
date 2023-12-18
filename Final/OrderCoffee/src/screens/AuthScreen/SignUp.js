import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../../utils/dimession';
import {colors} from '../../assets/colors';
import firestore from '@react-native-firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const SignUp = ({route}) => {
  const navigation = useNavigation();
  const [gender, setGender] = useState(true);
  const phone = route?.params?.phone || '';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName || !email || !gender || !address) {
        console.error('Please fill in all required fields');
        return;
      }

      const userData = {
        lastName,
        firstName,
        gender,
        email,
        phone,
        address,
        dob: formatDate(dob),
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection('TblUsers').add(userData);

      navigation.navigate('TabControl');

      console.log('Sign up successful');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    hideDatePicker();
    setDob(selectedDate || dob);
  };

const formatDate = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? '0' : ''}${day}/${
    month < 10 ? '0' : ''
  }${month}/${year}`;
};


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
          <TextInput
            style={styles.inputField}
            placeholder="Họ"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Tên"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Địa chỉ"
            value={address}
            onChangeText={text => setAddress(text)}
          />
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>Ngày sinh:</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{formatDate(dob)}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Giới tính:</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  gender ? styles.radioButtonActive : null,
                ]}
                onPress={() => setGender(true)}>
                {gender && <View style={styles.innerCircle} />}
              </TouchableOpacity>
              <Text style={styles.radioText}>Nữ</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  !gender ? styles.radioButtonActive : null,
                ]}
                onPress={() => setGender(false)}>
                {!gender && <View style={styles.innerCircle} />}
              </TouchableOpacity>
              <Text style={styles.radioText}>Nam</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => handleSignUp()}>
            <Text style={{color: 'white'}}>Đăng ký</Text>
          </TouchableOpacity>
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    // backgroundColor: colors.mainColor,
  },
  innerCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.mainColor,
  },
  radioText: {
    fontSize: 16,
    color: 'black',
  },
  submitBtn: {
    width: windowWidth * 0.92,
    height: windowHeight * 0.06,
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});
