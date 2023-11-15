import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OtherScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>OtherScreen</Text>
    </View>
  );
};

export default OtherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
