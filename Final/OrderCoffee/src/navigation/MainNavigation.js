import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import IndexScreen from '../screens/AuthScreen/IndexScreen';
import {getItem} from '../utils/asyncStorage';
import Authentication from '../screens/AuthScreen/Authentication';
import OtherScreen from '../screens/OtherScreen/OtherScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';
import PreferentialScreen from '../screens/TrackingScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';
import {windowWidth} from '../utils/dimession';
import NewsDetails from '../screens/HomeScreen/Components/NewsDetails';
import NewsExpand from '../screens/HomeScreen/Components/NewsExpand';
import UserDetails from '../screens/OtherScreen/Components/UserDetails';
import Setting from '../screens/OtherScreen/Components/Setting';
import SignUp from '../screens/AuthScreen/SignUp';
import TrackingScreen from '../screens/TrackingScreen';

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
          } else if (route.name === 'Tracking') {
            iconName = focused
              ? 'chart-timeline-variant'
              : 'chart-timeline-variant';
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
        name="Tracking"
        component={TrackingScreen}
        options={{
          headerShown: false,
          headerTitle: 'Đơn hàng của bạn',
          tabBarLabel: 'Đơn hàng',
        }}
      />
      <Tab.Screen
        name="Other"
        component={OtherScreen}
        options={{
          headerShown: false,
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
        name="SignUp"
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />

      <Stack.Screen
        name="TabControl"
        options={{headerShown: false}}
        component={TabControl}
      />

      <Stack.Screen
        name="NewsDetails"
        options={{
          headerShown: false,
        }}
        component={NewsDetails}
      />

      <Stack.Screen
        name="NewsExpand"
        options={{
          headerShown: false,
          headerTitle: 'Khám phá thêm ✨',
        }}
        component={NewsExpand}
      />

      <Stack.Screen
        name="UserDetails"
        options={{
          headerShown: false,
        }}
        component={UserDetails}
      />

      <Stack.Screen
        name="Setting"
        options={{
          headerShown: false,
        }}
        component={Setting}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
