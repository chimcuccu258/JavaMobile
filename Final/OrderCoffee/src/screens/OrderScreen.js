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
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Gesture,
  GestureDetector,
  TextInput,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import formatPrice from '../utils/formatPrice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/orderScreenStyle';
import CartModal from '../components/CartModal';

const OrderScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartShowVisible, setcartShowVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);
  const [quantities, setQuantities] = useState({});

  const handleNoteBoxPress = () => {
    setNoteModalVisible(true);
  };

  const closeNoteModal = () => {
    setNoteModalVisible(false);
  };

  const handleNoteSave = () => {
    console.log('Note saved:', noteText);
    closeNoteModal();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // lấy hình từ AsyncStorage nếu có
      const cachedMenus = await AsyncStorage.getItem('cachedMenus');
      const cachedImages = await AsyncStorage.getItem('cachedMenuImages');

      if (cachedMenus && cachedImages) {
        setMenus(JSON.parse(cachedMenus));
        setImages(JSON.parse(cachedImages));
        setIsLoading(false);
      } else {
        // ko có thì lấy từ firestore & storage
        const snapshot = await firestore().collection('TblMenus').get();
        const menuArrays = snapshot.docs.map(doc => doc.data());
        setMenus(menuArrays);

        const imageRef = await firebase.storage().ref('MenuImage/').listAll();
        const urls = await Promise.all(
          imageRef.items.map(async ref => await ref.getDownloadURL()),
        );
        setImages(urls);

        // lưu lại mai dùng tiếp
        await AsyncStorage.setItem('cachedMenus', JSON.stringify(menuArrays));
        await AsyncStorage.setItem('cachedMenuImages', JSON.stringify(urls));

        setIsLoading(false);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const handleProductPress = (product, index) => {
    const initialQuantity = quantities[product.title] || 1;

    setSelectedProduct({
      title: product.title,
      image: images[index],
      description: product.description,
      price: product.price,
    });

    setQuantity(initialQuantity);
    setIsModalVisible(true);
  };

  const handlePlusIconPress = items => {
    console.log('items', items);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setShowFullDescription(false);
    setNoteText('');
    // setQuantity(1);
    setQuantity(prevQuantity => prevQuantity || initialQuantity);
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

  const handleIncrease = () => {
    if (quantity < 10) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleOrderBtnPress = () => {
    const total = selectedProduct.price * quantity;

    setCartQuantity(quantity);
    setCartPrice(total);

    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [selectedProduct.title]: quantity,
    }));

    setIsModalVisible(false);
    setcartShowVisible(true);
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
              // increase={handleIncrease}
              // decrease={handleDecrease}
              quantity={quantity}
            />
          </>
        )}
      </ScrollView>

      {/* <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 30,
          backgroundColor: colors.mainColor,
          paddingVertical: 5,
          // paddingHorizontal: 20,
          borderRadius: 20,
        }}>
        <CartModal />
      </View> */}

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
                <View style={styles.note}>
                  <Text style={styles.noteTitle}>Yêu cầu khác</Text>
                  <Text style={styles.noteContent}>
                    Nhập yêu cầu của bạn tại đây
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleNoteBoxPress}
                    style={styles.noteBox}>
                    <Text style={{color: colors.darkGray}}>Thêm ghi chú</Text>
                  </TouchableOpacity>
                  {noteModalVisible ? (
                    <Modal
                      visible={noteModalVisible}
                      onRequestClose={closeNoteModal}
                      style={[
                        {
                          height: windowHeight / 2,
                        },
                        viewStyleAnim,
                      ]}
                      animationType="slide"
                      presentationStyle="pageSheet">
                      <Animated.ScrollView>
                        <View style={styles.noteModalHeader}>
                          <Text style={styles.noteTitle}>Ghi chú</Text>
                        </View>
                        <View style={styles.noteModalContent}>
                          <TextInput
                            style={styles.noteInput}
                            placeholder="Nhập ghi chú của bạn"
                            multiline
                            value={noteText.toString()}
                            onChangeText={text => setNoteText(text)}
                          />
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={handleNoteSave}
                            style={styles.saveNoteBtn}>
                            <Text
                              style={{color: colors.white, fontWeight: 'bold'}}>
                              Nhập
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Animated.ScrollView>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={closeNoteModal}
                        style={styles.closeBtn}>
                        <AntDesign
                          name="close"
                          size={22}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </Modal>
                  ) : null}
                </View>
              </View>
            </Animated.ScrollView>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={closeModal}
              style={styles.closeBtn}>
              <AntDesign name="close" size={22} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.optionBtn}>
              <View style={styles.optionBtnContainer}>
                <View style={styles.optionBtnContainerLeft}>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => handleDecrease()}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={colors.mainColor}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: 10,
                    }}>
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => handleIncrease()}>
                    <AntDesign name="plus" size={20} color={colors.mainColor} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.orderBtn}
                  onPress={handleOrderBtnPress}>
                  <Text style={styles.orderBtnText}>
                    Chọn {formatPrice(selectedProduct?.price)}đ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </GestureDetector>
      ) : null}

      {cartShowVisible ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 30,
            backgroundColor: colors.mainColor,
            paddingVertical: 5,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              width: 25,
              height: 25,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <Text style={{fontSize: 13, color: colors.mainColor}}>
              {cartQuantity}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              justifyContent: 'center',
              marginRight: 15,
            }}>
            <Text
              style={{fontSize: 14, color: colors.white, fontWeight: 'bold'}}>
              {formatPrice(cartPrice)}đ
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default OrderScreen;
