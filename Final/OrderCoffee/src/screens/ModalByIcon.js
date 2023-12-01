import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ModalByIcon = ({selectedProduct2, closeModal}) => {
  return (
    <View>
      <Text>PP</Text>
      <TouchableOpacity onPress={closeModal}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalByIcon;
