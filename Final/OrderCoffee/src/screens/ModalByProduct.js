import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react'
import { ScrollView } from 'react-native-virtualized-view';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../assets/colors';

const ModalByProduct = ({
  selectedProduct,
  closeModal
}) => {
  const {title, image} = selectedProduct;

  return (
    <>
      <ScrollView>
        <FastImage
          source={{uri: image}}
          style={{flex: 1, aspectRatio: 1}}
          resizeMode={FastImage.resizeMode.contain}
          onError={error => console.error('Image Error:', error)}
        />
      </ScrollView>
      <Text>{title}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={closeModal} style={styles.closeBtn}>
        <AntDesign name="close" size={22} color={colors.white}/>
      </TouchableOpacity>
    </>
  );
}

export default ModalByProduct

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    marginTop: 10,
    alignItems: 'flex-end',
    right: 10,
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    padding: 5,
  }
});