import 'package:coffee_order/screens/bottom_navigation.dart';
import 'package:flutter/material.dart';
import 'package:coffee_order/widgets/items_widget.dart';

class OrderScreen extends StatefulWidget {
  const OrderScreen({Key? key}) : super(key: key);

  @override
  _OrderScreenState createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    _tabController = TabController(length: 3, vsync: this, initialIndex: 0);
    _tabController.addListener(_handleTabSelection);
    super.initState();
  }

  _handleTabSelection() {
    if (_tabController.indexIsChanging) {
      setState(() {});
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text(
          "Đặt hàng",
          style: TextStyle(color: Colors.black),
        ),
      ),
      body: ListView(
        children: [
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
            width: MediaQuery.of(context).size.width,
            height: 48,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: const Color.fromARGB(255, 225, 225, 225),
              borderRadius: BorderRadius.circular(10),
            ),
            child: TextFormField(
              decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: "Tìm kiếm",
                hintStyle: TextStyle(color: Colors.black),
                prefixIcon: Icon(
                  Icons.search,
                  color: Colors.black,
                ),
              ),
            ),
          ),
          TabBar(
            controller: _tabController,
            labelColor: Colors.black,
            unselectedLabelColor: Colors.grey,
            isScrollable: true,
            indicator: UnderlineTabIndicator(
              borderSide: BorderSide(
                width: 3,
                color: Colors.brown,
              ),
              insets: EdgeInsets.symmetric(horizontal: 16,)
            ),
            labelStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
            labelPadding: EdgeInsets.symmetric(horizontal: 16),
            tabs: [
              Tab(
                text: "Coffee",
              ),
              Tab(
                text: "Coffee",
              ),
              Tab(
                text: "Coffee",
              ),
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Center(
            child: [
              ItemsWidget(),
              ItemsWidget(),
              ItemsWidget(),
            ][_tabController.index],
          )
        ],
      ),
    );
  }
}
