import {View, Text, StyleSheet} from 'react-native';
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { windowHeight, windowWidth } from '../utils/dimession';
import { colors } from '../assets/colors';

const PreferentialScreen = ({route, navigation}) => {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.card}>

        </View>
        <View>

        </View>
      </ScrollView>
    </>
  );
};

export default PreferentialScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  card: {
    width: windowWidth,
    height: windowHeight * 0.3,
    backgroundColor: 'white',
    alignSelf: 'center',
  },

});