import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {windowHeight} from '../utils/dimession';
import QRScan from '../components/QRScan';
import BottomTabs from '../components/BottomTabs';
import HomeScreen from './HomeScreen';
import {useNavigation} from '@react-navigation/native';
import OtherScreen from './OtherScreen';
import PreferentialScreen from './PreferentialScreen';
import OrderScreen from './OrderScreen';

const TabControl = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleTabPress = screenName => {
    setSelectedTab(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenOption}>
        {selectedTab === 'Home' && (
          <View style={styles.screenOption}>
            <HomeScreen />
          </View>
        )}
        {selectedTab === 'Order' && (
          <View style={styles.screenOption}>
            <OrderScreen />
          </View>
        )}
        {selectedTab === 'Preferential' && (
          <View style={styles.screenOption}>
            <PreferentialScreen />
          </View>
        )}
        {selectedTab === 'Other' && (
          <View style={styles.screenOption}>
            <OtherScreen />
          </View>
        )}
      </View>

      <View style={styles.qr}>
        <QRScan />
      </View>
      <BottomTabs onTabPress={handleTabPress} />
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
