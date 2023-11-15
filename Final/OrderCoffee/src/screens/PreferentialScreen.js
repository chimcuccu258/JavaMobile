import {View, Text, StyleSheet} from 'react-native';
import React from 'react'
import {useNavigation} from '@react-navigation/native';

const PreferentialScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>PreferentialScreen</Text>
    </View>
  );
};

export default PreferentialScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});