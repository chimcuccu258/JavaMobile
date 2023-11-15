import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTabs = ({onTabPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.5}
        onPress={() => onTabPress('Home')}>
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name="home-variant-outline"
            size={windowHeight * 0.03}
            color={'gray'}
          />
          <Text style={styles.iconTitle}>Trang chủ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.5}
        onPress={() => onTabPress('Order')}>
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name="shopping-outline"
            size={windowHeight * 0.03}
            color={'gray'}
          />
          <Text style={styles.iconTitle}>Đặt hàng</Text>
        </View>
      </TouchableOpacity>

      <View>
        <Text
          style={{
            marginTop: windowHeight * 0.045,
            color: colors.mainColor,
            fontSize: 11,
          }}>
          Quét mã
        </Text>
      </View>

      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.5}
        onPress={() => onTabPress('Preferential')}>
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={windowHeight * 0.03}
            color={'gray'}
          />
          <Text style={styles.iconTitle}>Ưu đãi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.5}
        onPress={() => onTabPress('Other')}>
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name="menu"
            size={windowHeight * 0.03}
            color={'gray'}
          />
          <Text style={styles.iconTitle}>Khác</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: windowWidth,
    height: windowHeight * 0.1,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: windowWidth * 0.03,
  },
  tabContent: {
    alignItems: 'center',
  },
  iconTitle: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});
