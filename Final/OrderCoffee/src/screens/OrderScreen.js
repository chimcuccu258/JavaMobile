import {
  View,
  Text,
  StyleSheet,
  FlatList,
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
import ModalByIcon from './ModalByIcon';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Gesture,
  GestureDetector,
  GestureRecognizer,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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

  const quantity = 1;

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

  const handleProductPress = (product, index) => {
    setSelectedProduct({
      title: product.title,
      image: images[index],
      description: product.description,
      price: product.price,
    });
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

  const translationY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(event => {})
    .onUpdate(event => {
      console.log('event', event.translationY);

      translationY.value = event.translationY;
    })
    .onEnd(event => {
      if (event.translationY > windowHeight) {
        runOnJS(closeModal)();
      } else {
        translationY.value = withTiming(0);
      }
    })
    .onFinalize(event => {});

  const viewStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translationY.value}],
    };
  });

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
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
        <GestureDetector gesture={gesture}>
          <Modal
            visible={isModalVisible}
            onRequestClose={closeModal}
            style={[
              {
                height: windowHeight,
              },
              viewStyleAnim,
            ]}
            animationType="slide"
            presentationStyle="pageSheet">
            <Animated.ScrollView>
              <FastImage
                source={{uri: selectedProduct?.image}}
                style={{
                  width: windowWidth,
                  height: windowWidth,
                }}
                resizeMode={FastImage.resizeMode.contain}
                onError={error => console.error('Image Error:', error)}
              />
              <View style={{marginHorizontal: 15}}>
                <Text style={styles.title}>{selectedProduct?.title}</Text>
                <Text
                  numberOfLines={showFullDescription ? 0 : 2}
                  ellipsizeMode="tail"
                  style={styles.description}>
                  {selectedProduct?.description}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={toggleDescription}>
                  <Text style={styles.readMoreLess}>
                    {showFullDescription ? 'Rút gọn' : 'Xem thêm'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.ScrollView>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={closeModal}
              style={styles.closeBtn}>
              <AntDesign name="close" size={22} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.optionBtn}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.secondaryColor,
                    padding: 5,
                    borderRadius: 50,
                  }}>
                  <AntDesign name="minus" size={20} color={colors.mainColor} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    // fontWeight: 'bold',
                    marginHorizontal: 10,
                  }}>
                  {quantity}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.secondaryColor,
                    padding: 5,
                    borderRadius: 50,
                  }}>
                  <AntDesign name="plus" size={20} color={colors.mainColor} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </GestureDetector>
      ) : isModalVisible2 ? (
        <Modal
          visible={isModalVisible2}
          onRequestClose={closeModal}
          style={[
            {
              height: windowHeight,
            },
            viewStyleAnim,
          ]}
          animationType="slide"
          presentationStyle="pageSheet">
          <Animated.ScrollView>
            <Text>{selectedProduct2}</Text>
          </Animated.ScrollView>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={closeModal}
            style={styles.closeBtn}>
            <AntDesign name="close" size={22} color={colors.white} />
          </TouchableOpacity>
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
  closeBtn: {
    position: 'absolute',
    marginTop: 10,
    alignItems: 'flex-end',
    right: 10,
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
  readMoreLess: {
    color: colors.mainColor,
  },
  optionBtn: {
    flex: 1,
    position: 'absolute',
    height: windowHeight * 0.12,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'pink',
  },
});
