import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
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

const OrderScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [menus, setMenus] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="gray" />
        </View>
      ) : (
        <>
          <MenuList menus={menus} />
          <ProductList menus={menus} images={images} />
        </>
      )}
    </ScrollView>
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
