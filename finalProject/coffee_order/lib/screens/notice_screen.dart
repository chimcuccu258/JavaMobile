import 'package:flutter/material.dart';

class NoticeScreen extends StatefulWidget {
  const NoticeScreen({Key? key}) : super(key: key);

  @override
  _NoticeScreenState createState() => _NoticeScreenState();
}

class _NoticeScreenState extends State<NoticeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text('Thông báo', style: TextStyle(color: Colors.black)),
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
