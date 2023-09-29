import 'package:flutter/material.dart';

class OtherScreen extends StatefulWidget {
  const OtherScreen({Key? key}) : super(key: key);

  @override
  _OtherScreenState createState() => _OtherScreenState();
}

class _OtherScreenState extends State<OtherScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text('Khác', style: TextStyle(color: Colors.black)),
      ),
      body: Center(
        child: Text(
          'Order Screen Content',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
