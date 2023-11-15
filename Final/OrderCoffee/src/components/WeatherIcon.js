import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';
import {windowHeight, windowWidth} from '../utils/dimession';
import LottieView from 'lottie-react-native';

const WeatherIcon = () => {
  const [weatherAnimation, setWeatherAnimation] = useState('Sunny.json');

  const fetchWeatherData = () => {
    const apiKey = '48508e72b228a42301c32c30a4881d0f';
    const city = 'Nha Trang';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const isNight = isNightTime(data.sys.sunrise, data.sys.sunset);
        const weatherCondition = getWeatherCondition(
          data.weather[0].id,
          isNight,
        );
        const animation = getWeatherAnimation(weatherCondition);
        setWeatherAnimation(animation);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const getWeatherCondition = (weatherId, isNight) => {
    if (isNight) {
      return 'Night';
    } else if (weatherId >= 200 && weatherId < 300) {
      return 'Thunderstorm';
    } else if (weatherId >= 300 && weatherId < 600) {
      return 'Rain';
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'Fog';
    } else if (weatherId === 800) {
      return 'Clear';
    } else if (weatherId >= 801 && weatherId < 900) {
      return 'Clouds';
    } else {
      return 'Unknown';
    }
  };


  const getWeatherAnimation = weatherCondition => {
    switch (weatherCondition) {
      case 'Cloudy_night':
        return 'Cloudy_night.json';
      case 'Night':
        return 'Night.json';
      case 'Partly_shower':
        return 'Partly_shower.json';
      case 'Partly_cloudy':
        return 'Partly_cloudy.json';
      case 'Rainy_night':
        return 'Rainy_night.json';
      case 'Storm_shower':
        return 'Storm_shower.json';
      case 'Storm':
        return 'Storm.json';
      case 'Sunny':
        return 'Sunny.json';
      case 'Thunder':
        return 'Thunder.json';
      case 'Windy':
        return 'Windy.json';
      default:
        return 'Sunny.json';
    }
  };

  const isNightTime = (sunrise, sunset) => {
    const currentTime = new Date().getTime() / 1000;
    const localSunrise = new Date(sunrise * 1000).toLocaleTimeString('en-US', {
      hour12: false,
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    const localSunset = new Date(sunset * 1000).toLocaleTimeString('en-US', {
      hour12: false,
      timeZone: 'Asia/Ho_Chi_Minh',
    });

    return (
      currentTime < new Date(localSunrise).getTime() / 1000 ||
      currentTime > new Date(localSunset).getTime() / 1000
    );
  };

  useEffect(() => {
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.weatherBox}>
        <LottieView
          style={{flex: 1}}
          source={require('../assets/animations/Cloudy_night.json')}
          autoPlay
          loop
        />
      </View>
    </TouchableOpacity>
  );
};

export default WeatherIcon;

const styles = StyleSheet.create({
  weatherBox: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
  },
});
