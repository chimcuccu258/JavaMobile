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
import { ScrollView } from 'react-native-virtualized-view';
import {ActivityIndicator} from 'react-native';

const OrderScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await firestore().collection('TblMenu').get();
        const menuData = [];

        for (const doc of querySnapshot.docs) {
          const mainData = {
            listTitle: doc.data().listTitle,
          };

          const menuCollection = await doc.ref.collection('menu').get();
          const menuItems = menuCollection.docs.map(menuDoc => ({
            title: menuDoc.data().title,
            price: menuDoc.data().price,
          }));

          menuData.push({
            ...mainData,
            menuItems,
          });
          setIsLoading(false);
        }

        setMenus(menuData);
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
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <>
          <MenuList menus={menus} />
          <ProductList menus={menus} />
        </>
      )}
      {/* <MenuList menus={menus} />
      <ProductList menus={menus} /> */}
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
