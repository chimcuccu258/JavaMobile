import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import IndexScreen from '../screens/IndexScreen';
import {getItem} from '../utils/asyncStorage';
import Authentication from '../screens/Authentication';
import OtherScreen from '../screens/OtherScreen';
import OrderScreen from '../screens/OrderScreen';
import PreferentialScreen from '../screens/PreferentialScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';
import {windowWidth} from '../utils/dimession';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabControl = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-variant' : 'home-variant-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Preferential') {
            iconName = focused
              ? 'ticket-confirmation'
              : 'ticket-confirmation-outline';
          } else if (route.name === 'Other') {
            iconName = 'menu';
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={windowWidth * 0.065}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.mainColor,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: windowWidth * 0.026,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: true,
          headerTitle: 'Danh mục',
          headerTitleAlign: 'left',
          tabBarLabel: 'Đặt hàng',
        }}
      />
      <Tab.Screen
        name="Preferential"
        component={PreferentialScreen}
        options={{
          headerShown: true,
          headerTitle: 'Ưu đãi của bạn',
          tabBarLabel: 'Ưu đãi',
        }}
      />
      <Tab.Screen
        name="Other"
        component={OtherScreen}
        options={{
          headerShown: false,
          // headerTitle: 'Khác',
        }}
      />
    </Tab.Navigator>
  );
};
const MainNavigation = () => {
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
};

export default MainNavigation;
