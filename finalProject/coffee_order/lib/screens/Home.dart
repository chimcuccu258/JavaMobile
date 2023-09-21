import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Coffee Order'),
        centerTitle: true,
        backgroundColor: Colors.brown,
      ),
      body: const Center(
        child: Text('Welcome to Coffee Order'),
      ),
    );
  }
}
