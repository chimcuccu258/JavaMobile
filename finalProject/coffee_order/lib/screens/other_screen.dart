import 'package:flutter/material.dart';

class OtherScreen extends StatelessWidget {
  const OtherScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Center(
        child: Text(
          'Home Screen Content',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
