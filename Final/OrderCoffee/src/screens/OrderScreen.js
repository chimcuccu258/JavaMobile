import {View, Text, StyleSheet} from 'react-native';
import React from 'react'
import {useNavigation} from '@react-navigation/native';

const OrderScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>OrderScreen</Text>
    </View>
  );
};

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});