import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import BottomTabs from '../components/BottomTabs';

const HomeScreen = ({route, navigation}) => {
  // const navigation = useNavigation();
  // const phone = route?.params?.phone || '';

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <View style={styles.bottomTabs}>
        <BottomTabs />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  bottomTabs: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
});
