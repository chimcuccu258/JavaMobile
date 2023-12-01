import {View, Text, StyleSheet} from 'react-native';
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';

const PreferentialScreen = ({route, navigation}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        <Text>PreferentialScreen</Text>
      </ScrollView>
    </>
  );
};

export default PreferentialScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});