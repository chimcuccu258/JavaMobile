import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../assets/colors';
import formatPrice from '../../../utils/formatPrice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

const CartModal = props => {
  const {quantities, menus, images, userData, onDelete} = props;
  const [shippingAddress, setShippingAddress] = useState('');
  const [note, setNote] = useState('');
  const shippingFee = 20000;
  const totalBill =
    Object.keys(quantities).reduce(
      (total, title) =>
        total +
        quantities[title] * menus.find(item => item.title === title)?.price,
      0,
    ) + shippingFee;

  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const totalItemsCount = Object.values(quantities).reduce(
      (total, quantity) => total + quantity,
      0,
    );
    setTotalQuantity(totalItemsCount);
  }, [quantities]);

  const handleDelete = () => {
    onDelete();
    props.closeModal();
  };

  const generateRandomId = () => {
    const prefix = 'tch';
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    return `${prefix}${randomNumber}`;
  };

  const newId = generateRandomId();

  return (
    <View style={styles.container}>
      <View style={styles.cartModalHeader}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
          <Text>Xoá</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: '600', fontSize: 16}}>Xác nhận đơn hàng</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={props.closeModal}
          style={styles.closeBtn}>
          <AntDesign name="close" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          {userData && (
            <View style={styles.userInfo}>
              <Text style={{fontWeight: '600', fontSize: 16}}>
                Địa chỉ giao hàng
              </Text>
              <TextInput
                style={styles.addressInput}
                placeholder={userData.address}
                placeholderTextColor={colors.black}
                value={shippingAddress}
                onChangeText={text => setShippingAddress(text)}
              />
              <Text style={{fontWeight: '600', fontSize: 16, marginTop: 30}}>
                Thông tin người nhận
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: Dimensions.get('window').height * 0.1,

                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <TextInput
                    style={styles.infoInput}
                    placeholder={userData.firstName + ' ' + userData.lastName}
                    placeholderTextColor={colors.black}
                    editable={true}
                  />
                  <TextInput
                    style={styles.infoInput}
                    placeholder={userData.phone}
                    placeholderTextColor={colors.black}
                    editable={true}
                  />
                </View>
              </View>
            </View>
          )}
          <Text style={{fontWeight: '600', fontSize: 16, marginTop: 30}}>
            Ghi chú
          </Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Ghi chú cho người giao hàng"
            placeholderTextColor="#dddddd"
            value={note}
            onChangeText={text => setNote(text)}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text style={{fontWeight: '600', fontSize: 16}}>
              Thời gian giao hàng
            </Text>
            <Text style={{fontWeight: '400', fontSize: 14}}>Giao ngay</Text>
          </View>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              marginTop: 30,
            }}>
            Sản phẩm đã chọn
          </Text>
          {Object.keys(quantities).map(title => (
            <View key={title} style={styles.cartItem}>
              <View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  {/* <MaterialIcons
                    name="coffee"
                    size={20}
                    color={colors.mainColor}
                  /> */}
                  <LottieView
                    // source={require('../../assets/animations/christmas.json')}
                    source={require('../../../assets/animations/hotCup.json')}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    autoPlay
                    loop
                    withTiming
                  />
                  <Text
                    style={{fontSize: 14, fontWeight: '600', marginLeft: 5}}>
                    {title}
                  </Text>
                </View>
                <Text style={{fontSize: 14}}>x {quantities[title]}</Text>
              </View>
              <Text style={{fontSize: 14}}>
                {formatPrice(menus.find(item => item.title === title)?.price)}đ
              </Text>
            </View>
          ))}
          <Text style={{fontWeight: '600', fontSize: 16, marginTop: 30}}>
            Tổng cộng
          </Text>
          <View
            style={{
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: '#dddddd',
                paddingBottom: 10,
              }}>
              <Text style={{fontSize: 14}}>Thành tiền</Text>
              <Text style={{fontSize: 14}}>
                {formatPrice(
                  Object.keys(quantities).reduce(
                    (total, title) =>
                      total +
                      quantities[title] *
                        menus.find(item => item.title === title)?.price,
                    0,
                  ),
                )}
                đ
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: '#dddddd',
                paddingBottom: 10,
              }}>
              <Text style={{fontSize: 14}}>Phí giao hàng</Text>
              <Text style={{fontSize: 14}}>{formatPrice(shippingFee)}đ</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                Số tiền thanh toán
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600'}}>
                {formatPrice(totalBill)}đ
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={{fontWeight: '600', fontSize: 16}}>
                Hình thức thanh toán
              </Text>
              <Text style={{fontWeight: '400', fontSize: 14}}>Tiền mặt</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').height * 0.11,
          backgroundColor: colors.mainColor,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 16, color: colors.white}}>
            Giao hàng • {totalItems} sản phẩm
          </Text>
          <Text style={{fontSize: 16, color: colors.white, fontWeight: '700'}}>
            {formatPrice(totalBill)}đ
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRadius: 50,
            height: 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              firestore()
                .collection('TblBills')
                .add({
                  id: generateRandomId(),
                  userId: firebase.auth().currentUser.uid,
                  shippingAddress: shippingAddress || userData.address,
                  note,
                  items: Object.keys(quantities).map(title => ({
                    title,
                    quantity: quantities[title],
                    price: menus.find(item => item.title === title)?.price || 0,
                  })),
                  totalQuantity,
                  totalBill,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                  status: false,
                  done: false
                })
                .then(() => {
                  props.closeModal();
                  onDelete();
                  Alert.alert('Bạn đã đặt hàng thành công 🎉');
                });
            }}>
            <Text
              style={{
                fontSize: 15,
                color: colors.mainColor,
                fontWeight: '500',
              }}>
              Đặt hàng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,

    height: 50,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  closeBtn: {
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    padding: 5,
  },
  addressInput: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    marginVertical: 10,
  },
  infoInput: {
    borderRadius: 5,
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: '#dddddd',
    marginTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 10,

    width: '100%',
    height: 50,
  },
});
