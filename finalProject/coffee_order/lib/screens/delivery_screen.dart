import 'package:flutter/material.dart';

class DeliveryScreen extends StatefulWidget {
  const DeliveryScreen({Key? key}) : super(key: key);

  @override
  _DeliveryScreenState createState() => _DeliveryScreenState();
}

class _DeliveryScreenState extends State<DeliveryScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text('Giao hàng', style: TextStyle(color: Colors.black)),
      ),
      body: Center(
        child: Text(
          'Delivery Screen Content',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
