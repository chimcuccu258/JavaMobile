import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ModalByProduct = ({selectedProduct, closeModal}) => {
  const title = selectedProduct?.title;
  const image = selectedProduct?.image;

  const translationY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(event => {})
    .onUpdate(event => {
      console.log('event', event.translationY);

      translationY.value = event.translationY;

      // translationY.value = event.translationY;
      // rotation.value = event.translationY;
    })
    .onEnd(event => {
      if (event.translationY > Dimensions.get('screen').height / 5) {
        console.log('close modal');
        runOnJS(closeModal)();
      } else {
        translationY.value = withTiming(0);
      }
    })
    .onFinalize(event => {});

  const viewStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translationY.value}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            backgroundColor: 'pink',
            height: Dimensions.get('screen').height,
          },
          viewStyleAnim,
        ]}>
        <View>
          <FastImage
            source={{uri: image}}
            style={{flex: 1, aspectRatio: 1}}
            resizeMode={FastImage.resizeMode.contain}
            onError={error => console.error('Image Error:', error)}
          />
          <Text>{title}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={closeModal}
            style={styles.closeBtn}>
            <AntDesign name="close" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ModalByProduct;

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    marginTop: 10,
    alignItems: 'flex-end',
    right: 10,
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    padding: 5,
  },
});
