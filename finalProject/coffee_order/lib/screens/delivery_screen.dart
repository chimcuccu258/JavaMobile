import 'package:flutter/material.dart';

class DeliveryScreen extends StatelessWidget {
  const DeliveryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Deliver Screen Content',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
