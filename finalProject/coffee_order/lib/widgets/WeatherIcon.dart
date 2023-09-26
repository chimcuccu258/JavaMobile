import 'package:flutter/material.dart';

class WeatherIcon extends StatelessWidget {
  const WeatherIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Icon(
        Icons.wb_sunny,
        color: Colors.yellow,
        size: 30,
      ),
      padding: EdgeInsets.only(right: 10),
    );
  }
}