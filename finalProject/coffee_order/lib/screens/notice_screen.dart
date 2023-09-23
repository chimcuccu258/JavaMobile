import 'package:flutter/material.dart';

class NoticeScreen extends StatelessWidget {
  const NoticeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home'),
      ),
      body: Center(
        child: Text(
          'Notice Screen Content',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
