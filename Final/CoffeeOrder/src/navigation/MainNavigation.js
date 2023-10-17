import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import IndexScreen from '../screens/IndexScreen';
import {getItem} from '../utils/asyncStorage';
import Authentication from '../screens/Authentication';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnBoarded();
  }, []);

  const checkIfAlreadyOnBoarded = async () => {
    let onBoarded = await getItem('onBoarded');
    if (onBoarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          options={{headerShown: false}}
          component={OnboardingScreen}
        />

        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={IndexScreen}
        />

        <Stack.Screen
          name="Authentication"
          component={Authentication}
        />
      </Stack.Navigator>
    );
  } else {
    return (  
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Onboarding"
          options={{headerShown: false}}
          component={OnboardingScreen}
        />

        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />

        <Stack.Screen
          name='Authentication'
          component={Authentication}
        />
      </Stack.Navigator>
    );
  }
}
