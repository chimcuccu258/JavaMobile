import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../utils/dimession';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';

const QRScan = () => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="barcode-scan"
          size={windowWidth * 0.1}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

export default QRScan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth * 0.09,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
});
