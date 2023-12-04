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

const OrderScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteText, setNoteText] = useState([]);

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

  const quantity = 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // lấy hình từ AsyncStorage nếu có  
      const cachedMenus = await AsyncStorage.getItem('cachedMenus');
      const cachedImages = await AsyncStorage.getItem('cachedMenuImages');

      // const snapshot = await firestore().collection('TblMenus').get();
      // const menuArrays = snapshot.docs.map(doc => doc.data());
      // setMenus(menuArrays);

      // const imageRef = await firebase.storage().ref('MenuImage/').listAll();
      // const urls = await Promise.all(
      //   imageRef.items.map(async ref => await ref.getDownloadURL()),
      // );
      // setImages(urls);

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
    setSelectedProduct({
      title: product.title,
      image: images[index],
      description: product.description,
      price: product.price,
    });
    setIsModalVisible(true);
  };

  const handlePlusIconPress = items => {
    console.log('items', items);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
                <View style={styles.note}>
                  <Text style={styles.noteTitle}>Yêu cầu khác</Text>
                  <Text style={styles.noteContent}>
                    Nhập yêu cầu của bạn tại đây
                  </Text>
                  {/* {isModalVisible ? (
                    
                  ) : null} */}
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
                  <TouchableOpacity style={styles.quantityBtn}>
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
                  <TouchableOpacity style={styles.quantityBtn}>
                    <AntDesign name="plus" size={20} color={colors.mainColor} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.orderBtn}>
                  <Text style={styles.orderBtnText}>
                    Chọn {formatPrice(selectedProduct?.price)}đ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </GestureDetector>
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
    height: windowHeight * 0.11,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
  },
  optionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  optionBtnContainerLeft: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  quantityBtn: {
    backgroundColor: colors.secondaryColor,
    padding: 5,
    borderRadius: 50,
  },
  orderBtn: {
    backgroundColor: colors.mainColor,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 5,
  },
  orderBtnText: {
    fontSize: 16,
    color: colors.white,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  note: {
    marginVertical: 20,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 12,
    marginBottom: 20,
    color: colors.darkGray,
  },
  noteBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  noteModalHeader: {
    marginHorizontal: 15,
    marginTop: 20,
    alignItems: 'center',
  },

  noteModalContent: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  noteInput: {
    height: windowHeight * 0.1,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveNoteBtn: {
    backgroundColor: colors.mainColor,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
