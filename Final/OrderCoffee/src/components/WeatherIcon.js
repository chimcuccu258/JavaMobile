import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors';
import { windowHeight, windowWidth } from '../utils/dimession';

const WeatherIcon = () => {
  const [weatherIcon, setWeatherIcon] = useState('weather-sunny');
  const [iconColor, setIconColor] = useState('#FFD700');

  const fetchWeatherData = () => {
    const apiKey = '48508e72b228a42301c32c30a4881d0f';
    const city = 'Nha Trang';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const weatherId = data.weather[0].id;
        const isNight = isNightTime(data.sys.sunrise, data.sys.sunset);

        setWeatherIcon(getWeatherIcon(weatherId, isNight));
        setIconColor(getIconColor(weatherId, isNight));
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const getWeatherIcon = (weatherId, isNight) => {
    if (isNight) {
      return 'weather-night';
    } else if (weatherId >= 200 && weatherId < 300) {
      return 'weather-lightning-rainy';
    } else if (weatherId >= 300 && weatherId < 600) {
      return 'weather-pouring';
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'weather-snowy';
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'weather-fog';
    } else if (weatherId === 800) {
      return 'weather-sunny';
    } else if (weatherId > 800 && weatherId < 900) {
      return 'weather-partly-cloudy';
    } else {
      return 'weather-cloudy';
    }
  };

  const getIconColor = (weatherId, isNight) => {
    if (isNight) {
      return '#000000';
    } else if (weatherId >= 200 && weatherId < 600) {
      return '#6495ED';
    } else if (weatherId >= 600 && weatherId < 700) {
      return '#FFFFFF';
    } else if (weatherId >= 700 && weatherId < 800) {
      return '#A9A9A9';
    } else {
      return '#FFD700';
    }
  };

  const isNightTime = (sunrise, sunset) => {
    const currentTime = new Date().getTime() / 1000;
    return currentTime < sunrise || currentTime > sunset;
  };

  useEffect(() => {
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.weatherBox}>
        <MaterialCommunityIcons
          name={weatherIcon}
          size={windowWidth * 0.08}
          color={iconColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default WeatherIcon;

const styles = StyleSheet.create({
  weatherBox: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.08,
  },
});