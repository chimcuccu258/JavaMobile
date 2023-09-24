import 'package:flutter/material.dart';
import './screens/splash_screen.dart';
import './screens/home_screen.dart';
import './screens/order_screen.dart';
import './screens/delivery_screen.dart';
import './screens/notice_screen.dart';
import './screens/other_screen.dart';
import './screens/bottom_navigation.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/navigation': (context) => const BottomNavigation(),
      },
    );
  }
}
