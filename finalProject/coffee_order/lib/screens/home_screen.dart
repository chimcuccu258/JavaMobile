import 'package:curved_labeled_navigation_bar/curved_navigation_bar.dart';
import 'package:curved_labeled_navigation_bar/curved_navigation_bar_item.dart';
import 'package:flutter/material.dart';

// void main() {
//   runApp(const HomeScreen());
// }

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  void _handleNavigation(int index) {
    if (index != _currentIndex) {
      setState(() {
        _currentIndex = index;
      });
      switch (index) {
        case 0:
          break;
        case 1:
          Navigator.pushNamed(context, '/order');
          break;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: CurvedNavigationBar(
        color: Colors.brown,
        backgroundColor: Colors.white,
        buttonBackgroundColor: Colors.brown,
        animationDuration: const Duration(milliseconds: 180),
        animationCurve: Curves.linear,
        index: _currentIndex,
        items: const [
          CurvedNavigationBarItem(
            child: Icon(
              Icons.home_outlined,
              color: Colors.white,
            ),
            label: 'Trang chủ',
            labelStyle: TextStyle(
              fontSize: 13,
              color: Colors.white,
            ),
          ),
          CurvedNavigationBarItem(
            child: Icon(
              Icons.shopping_bag_outlined,
              color: Colors.white,
            ),
            label: 'Đặt hàng',
            labelStyle: TextStyle(
              fontSize: 13,
              color: Colors.white,
            ),
          ),
          CurvedNavigationBarItem(
            child: Icon(
              Icons.delivery_dining_outlined,
              color: Colors.white,
            ),
            label: 'Giao hàng',
            labelStyle: TextStyle(
              fontSize: 13,
              color: Colors.white,
            ),
          ),
          CurvedNavigationBarItem(
            child: Icon(
              Icons.notifications_outlined,
              color: Colors.white,
            ),
            label: 'Thông báo',
            labelStyle: TextStyle(
              fontSize: 13,
              color: Colors.white,
            ),
          ),
          CurvedNavigationBarItem(
            child: Icon(
              Icons.menu,
              color: Colors.white,
            ),
            label: 'Khác',
            labelStyle: TextStyle(
              fontSize: 13,
              color: Colors.white,
            ),
          ),
        ],
        onTap: _handleNavigation,
      ),
      body: const Center(
        child: Text(
          'Home Screen Content',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
