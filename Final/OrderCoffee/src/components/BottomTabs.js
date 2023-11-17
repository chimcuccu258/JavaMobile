import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../utils/dimession';
import {colors} from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTabs = ({ selectedTab, onTabPress }) => {
  console.log(selectedTab);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.5}
        onPress={() => onTabPress('Home')}>
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name={
              selectedTab === 'Home' ? 'home-variant' : 'home-variant-outline'
            }
            size={windowHeight * 0.03}
            color={selectedTab === 'Home' ? colors.mainColor : 'gray'}
          />
          <Text
            style={{
              ...styles.iconTitle,
              color: selectedTab === 'Home' ? colors.mainColor : 'gray',
            }}>
            Trang chủ
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        activeOpacity={0.5}
        onPress={() => onTabPress('Order')}>
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name={selectedTab === 'Order' ? 'shopping' : 'shopping-outline'}
            size={windowHeight * 0.03}
            color={selectedTab === 'Order' ? colors.mainColor : 'gray'}
          />
          <Text
            style={{
              ...styles.iconTitle,
              color: selectedTab === 'Order' ? colors.mainColor : 'gray',
            }}>
            Đặt hàng
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.tab}>
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
            name={
              selectedTab === 'Preferential'
                ? 'ticket-confirmation'
                : 'ticket-confirmation-outline'
            }
            size={windowHeight * 0.03}
            color={selectedTab === 'Preferential' ? colors.mainColor : 'gray'}
          />
          <Text
            style={{
              ...styles.iconTitle,
              color: selectedTab === 'Preferential' ? colors.mainColor : 'gray',
            }}>
            Ưu đãi
          </Text>
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
            color={selectedTab === 'Other' ? colors.mainColor : 'gray'}
          />
          <Text
            style={{
              ...styles.iconTitle,
              color: selectedTab === 'Other' ? colors.mainColor : 'gray',
            }}>
            Khác
          </Text>
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
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
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
