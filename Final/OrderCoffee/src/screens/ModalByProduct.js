import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react'

const ModalByProduct = ({
  selectedProduct,
  closeModal
}) => {
  return (
    <View>
      <Text>{selectedProduct}</Text>
      <TouchableOpacity onPress={closeModal}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ModalByProduct