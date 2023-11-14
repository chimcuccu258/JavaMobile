import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {windowHeight} from '../utils/dimession';
import QRScan from '../components/QRScan';
import BottomTabs from '../components/BottomTabs';
import HomeScreen from './HomeScreen';

const TabControl = () => {
  return (
    <View style={styles.container}>
      <View style={styles.screenOption}></View>
      <View style={styles.qr}>
        <QRScan />
      </View>
      <View style={styles.bottomTabs}>
        <BottomTabs />
      </View>
    </View>
  );
};

export default TabControl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    position: 'relative',
  },
  screenOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabs: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  qr: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: windowHeight * 0.06,
  },
});
