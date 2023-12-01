import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import FastImage from 'react-native-fast-image';
import MenuList from '../components/MenuList';
import ProductList from '../components/ProductList';
import {ScrollView} from 'react-native-virtualized-view';
import {ActivityIndicator} from 'react-native';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalByProduct from './ModalByProduct';
import ModalByIcon from './ModalByIcon';
import LottieView from 'lottie-react-native';

const OrderScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [menus, setMenus] = useState([]);
  const [images, setImages] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedProduct2, setSelectedProduct2] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const snapshot = await firestore().collection('TblMenus').get();
      const menuArrays = snapshot.docs.map(doc => doc.data());
      setMenus(menuArrays);

      const imageRef = await firebase.storage().ref('MenuImage/').listAll();
      const urls = await Promise.all(
        imageRef.items.map(async ref => await ref.getDownloadURL()),
      );
      setImages(urls);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const handleProductPress = productTitle => {
    setSelectedProduct(productTitle);
    setIsModalVisible(true);
  };

  const handlePlusIconPress = productTitle => {
    setSelectedProduct2(productTitle);
    setIsModalVisible2(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalVisible(false);
    setIsModalVisible2(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading || refreshing ? (
          <View style={styles.loadingContainer}>
            {/* <ActivityIndicator size="small" color="gray" /> */}
            <LottieView
              source={require('../assets/animations/christmas.json')}
              style={{width: windowWidth * 0.5, height: windowWidth * 0.5}}
              autoPlay
              loop
              withTiming
            />
          </View>
        ) : (
          <>
            <MenuList menus={menus} />
            <ProductList
              menus={menus}
              images={images}
              onProductPress={handleProductPress}
              onPlusIconPress={handlePlusIconPress}
            />
          </>
        )}
      </ScrollView>
      {isModalVisible ? (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          presentationStyle="pageSheet">
          <View style={styles.modalContainer}>
            <ModalByProduct
              closeModal={closeModal}
              selectedProduct={selectedProduct}
            />
          </View>
        </Modal>
      ) : isModalVisible2 ? (
        <Modal
          visible={isModalVisible2}
          animationType="slide"
          presentationStyle="pageSheet">
          <View style={styles.modalContainer}>
            <ModalByIcon
              closeModal={closeModal}
              selectedProduct2={selectedProduct2}
            />
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.8,
  },
});
