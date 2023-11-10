import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import { windowHeight, windowWidth } from '../utils/dimession';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate('Login');
  };

  const doneBtn = ({...props}) => (
    <TouchableOpacity style={styles.doneBtn} {...props}>
      <Text>Done</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneBtn}
        containerStyles={{padding: 20}}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  style={{flex: 1}}
                  source={require('../assets/animations/order.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Ea nobis id tempore cumque.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  style={{flex: 1}}
                  source={require('../assets/animations/delivery.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Delectus odio sit ipsam officia at iure repellat.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  style={{flex: 1}}
                  source={require('../assets/animations/receive.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle:
              'Iusto voluptatem eligendi qui assumenda voluptas provident nesciunt laborum quo.',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: windowWidth - 40,
    height: windowHeight / 2,
  },
  doneBtn: {
    padding: 20,
  },
});
