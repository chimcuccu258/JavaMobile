import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import IndexScreen from '../screens/IndexScreen';
import {getItem} from '../utils/asyncStorage';
import Authentication from '../screens/Authentication';
import TabControl from '../screens/TabControl';
import OtherScreen from '../screens/OtherScreen';
import OrderScreen from '../screens/OrderScreen';
import PreferentialScreen from '../screens/PreferentialScreen';

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

  if (showOnboarding === null) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={showOnboarding ? 'TabControl' : 'TabControl'}>
      {showOnboarding && (
        <>
          <Stack.Screen
            name="Onboarding"
            options={{headerShown: false}}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="IndexScreen"
            options={{headerShown: false}}
            component={IndexScreen}
          />
        </>
      )}

      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />

      <Stack.Screen
        name="Order"
        options={{headerShown: false}}
        component={OrderScreen}
      />

      <Stack.Screen
        name="Preferential"
        options={{headerShown: false}}
        component={PreferentialScreen}
      />

      <Stack.Screen
        name="Other"
        options={{headerShown: false}}
        component={OtherScreen}
      />

      <Stack.Screen
        name="Authentication"
        options={{
          headerShown: true,
          title: 'Authentication',
          headerBackTitle: false,
          headerBackTitleVisible: false,
          headerLeft: null,
        }}
        component={Authentication}
      />

      <Stack.Screen
        name="TabControl"
        options={{headerShown: false}}
        component={TabControl}
      />
    </Stack.Navigator>
  );
}
