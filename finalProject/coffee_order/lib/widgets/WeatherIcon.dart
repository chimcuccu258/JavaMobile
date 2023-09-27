import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class WeatherIcon extends StatefulWidget {
  final String city;

  const WeatherIcon({Key? key, required this.city}) : super(key: key);

  @override
  _WeatherIconState createState() => _WeatherIconState();
}

class _WeatherIconState extends State<WeatherIcon> {
  late String weatherCondition = 'Clear';

  @override
  void initState() {
    super.initState();
    fetchWeatherData();
  }

  Future<void> fetchWeatherData() async {
    try {
      final WeatherService weatherService = WeatherService();
      final weatherData = await weatherService.getWeatherData(widget.city);
      setState(() {
        weatherCondition = weatherData['weather'][0]['main'];
      });
      print('Thời tiết hiện tại: $weatherCondition');
    } catch (e) {
      print(e);
    }
  }

  // Icon getWeatherIcon() {
  //   if (weatherCondition == null) {
  //     return Icon(Icons.cloud);
  //   } else {
  //     switch (weatherCondition) {
  //       case 'Clear':
  //         return Icon(Icons.wb_sunny);
  //       case 'Clouds':
  //         return Icon(Icons.cloud);
  //       case 'Rain':
  //         return Icon(Icons.grain);
  //       default:
  //         return Icon(Icons.cloud);
  //     }
  //   }
  // }

  Icon getWeatherIcon() {
    Color iconColor;

    if (weatherCondition == null) {
      iconColor = Colors.black;
    } else {
      switch (weatherCondition) {
        case 'Clear':
          iconColor = Colors.yellow;
          return Icon(Icons.wb_sunny, color: iconColor);
        case 'Clouds':
          iconColor = const Color.fromARGB(255, 209, 209, 209);
          return Icon(Icons.cloud, color: iconColor);
        case 'Rain':
          iconColor = Colors.blue;
          return Icon(Icons.grain, color: iconColor);
        default:
          iconColor = Colors.white;
          return Icon(Icons.cloud, color: iconColor);
      }
    }

    return Icon(Icons.cloud, color: iconColor);
  }

  @override
  Widget build(BuildContext context) {
    return getWeatherIcon();
  }
}

class WeatherService {
  final String apiKey = '48508e72b228a42301c32c30a4881d0f';

  Future<Map<String, dynamic>> getWeatherData(String city) async {
    final response = await http.get(
      Uri.parse(
          'https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey'),
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load weather data');
    }
  }
}
