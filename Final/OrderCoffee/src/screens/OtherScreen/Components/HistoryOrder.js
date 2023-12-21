import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {formatDateTime} from '../../../utils/formatDate';
import formatPrice from '../../../utils/formatPrice';
import Receipt from '../../../assets/svg/Receipt';
import LottieView from 'lottie-react-native';
import {windowHeight, windowWidth} from '../../../utils/dimession';

const HistoryOrder = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      firestore()
        .collection('TblBills')
        .onSnapshot(querySnapshot => {
          const orderData = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            orderData.push(data);
          });
          setOrders(orderData);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.billContainer}>
      <View
        style={{
          width: '70%',
          flexDirection: 'row',
        }}>
        <Receipt />
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text
            style={[
              styles.billText,
              {
                fontWeight: '700',
                fontSize: 13,
              },
            ]}>
            {item.items.map(orderItem => orderItem.title).join(', ')}
          </Text>
          <Text style={styles.billText}>
            Trạng thái:
            {item.status ? ' Đã giao' : ' Chưa giao'}
          </Text>
          <Text style={styles.billText}>{formatDateTime(item.createdAt)}</Text>
        </View>
      </View>

      <View
        style={{
          width: '30%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            styles.billText,
            {
              fontWeight: '700',
              fontSize: 15,
            },
          ]}>
          {formatPrice(item.totalBill)}đ
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
          }}>
          <Ionicons name="chevron-back-outline" size={26} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
            Lịch sử đơn hàng
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../../assets/animations/christmas.json')}
            style={{width: windowWidth * 0.5, height: windowWidth * 0.5}}
            autoPlay
            loop
            withTiming
          />
        </View>
      ) : orders.length === 0 ? (
        <Text style={styles.emptyText}>Bạn chưa có đơn hàng nào</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 20,
  },
  headerTitle: {
    width: '100%',
  },
  billContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
  },
  billText: {
    fontSize: 13,
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.5,
  },
});

export default HistoryOrder;
