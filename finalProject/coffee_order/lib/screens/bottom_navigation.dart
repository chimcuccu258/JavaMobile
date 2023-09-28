import 'package:flutter/material.dart';
import 'package:coffee_order/screens/delivery_screen.dart';
import 'package:coffee_order/screens/home_screen.dart';
import 'package:coffee_order/screens/notice_screen.dart';
import 'package:coffee_order/screens/order_screen.dart';
import 'package:coffee_order/screens/other_screen.dart';
import 'package:curved_labeled_navigation_bar/curved_navigation_bar.dart';
import 'package:curved_labeled_navigation_bar/curved_navigation_bar_item.dart';

void main() {
  runApp(const MaterialApp(
    home: BottomNavigation(),
  ));
}


class BottomNavigation extends StatefulWidget {
  const BottomNavigation({Key? key}) : super(key: key);

  @override
  State<BottomNavigation> createState() => _BottomNavigationState();
}

class _BottomNavigationState extends State<BottomNavigation> {
  int _selectedIndex = 0;
  static final List<Widget> _widgetOption = <Widget>[
    const HomeScreen(),
    const OrderScreen(),
    const DeliveryScreen(),
    const NoticeScreen(),
    const OtherScreen(),
  ];

  final List<Widget> _screens = _widgetOption; 

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    // return Scaffold(
    //   body: Center(
    //     child: _widgetOption[_selectedIndex],
    //   ),
    //   bottomNavigationBar: CurvedNavigationBar(
    //     onTap: _onTap,
    //     color: Colors.brown,
    //     backgroundColor: Colors.white,
    //     buttonBackgroundColor: Colors.brown,
    //     animationDuration: const Duration(milliseconds: 180),
    //     items: const [
    //       CurvedNavigationBarItem(
    //         child: Icon(
    //           Icons.home_outlined,
    //           color: Colors.white,
    //         ),
    //         label: 'Trang chủ',
    //         labelStyle: TextStyle(
    //           fontSize: 13,
    //           color: Colors.white,
    //         ),
    //       ),
    //       CurvedNavigationBarItem(
    //         child: Icon(
    //           Icons.shopping_bag_outlined,
    //           color: Colors.white,
    //         ),
    //         label: 'Đặt hàng',
    //         labelStyle: TextStyle(
    //           fontSize: 13,
    //           color: Colors.white,
    //         ),
    //       ),
    //       CurvedNavigationBarItem(
    //         child: Icon(
    //           Icons.delivery_dining_outlined,
    //           color: Colors.white,
    //         ),
    //         label: 'Giao hàng',
    //         labelStyle: TextStyle(
    //           fontSize: 13,
    //           color: Colors.white,
    //         ),
    //       ),
    //       CurvedNavigationBarItem(
    //         child: Icon(
    //           Icons.notifications_outlined,
    //           color: Colors.white,
    //         ),
    //         label: 'Thông báo',
    //         labelStyle: TextStyle(
    //           fontSize: 13,
    //           color: Colors.white,
    //         ),
    //       ),
    //       CurvedNavigationBarItem(
    //         child: Icon(
    //           Icons.menu,
    //           color: Colors.white,
    //         ),
    //         label: 'Khác',
    //         labelStyle: TextStyle(
    //           fontSize: 13,
    //           color: Colors.white,
    //         ),
    //       ),
    //     ],
    //   ),
    // );
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Stack(
          children: [
            Navigator(
              onGenerateRoute: (routeSettings) {
                return MaterialPageRoute(
                  builder: (context) => _screens[_selectedIndex],
                );
              },
            ),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: CurvedNavigationBar(
                onTap: _onItemTapped,
                color: Colors.brown,
                backgroundColor: Colors.transparent,
                buttonBackgroundColor: Colors.brown,
                animationDuration: const Duration(milliseconds: 180),
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
              ),
            ),
          ],
        ),
      ),
    );
  }
}
