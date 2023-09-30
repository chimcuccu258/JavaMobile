import 'package:chewie/chewie.dart';
import 'package:coffee_order/widgets/WeatherIcon.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int currentIndex = 0;
  late VideoPlayerController _videoPlayerController;
  late ChewieController _chewieController;

  @override
  void initState() {
    super.initState();

    _videoPlayerController = VideoPlayerController.asset(
      'videos/intro.mp4',
    );

    _chewieController = ChewieController(
      videoPlayerController: _videoPlayerController,
      aspectRatio: 16 / 9,
      autoPlay: true,
      looping: true,
      allowMuting: true,
      showControls: false,
      allowPlaybackSpeedChanging: false,
      allowFullScreen: false,
      allowedScreenSleep: false,
      showControlsOnInitialize: false,
      showOptions: false,
    );
  }

  @override
  void dispose() {
    _videoPlayerController.dispose();
    _chewieController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Row(
          children: [
            IconButton(
              icon: const WeatherIcon(city: 'Nha Trang'),
              onPressed: () {},
            ),
            const Text(
              "Chào bạn",
              style: TextStyle(
                fontSize: 16,
                color: Colors.black,
              ),
            ),
          ],
        ),
        elevation: 0,
      ),
      body: Stack(
        children: [
          Container(
              height: 243.5,
              width: MediaQuery.of(context).size.width,
              child: Chewie(controller: _chewieController)),
          SingleChildScrollView(
            physics: ClampingScrollPhysics(),
            child: Column(
              children: [
                SizedBox(height: 350,),
                Container(
                  height: MediaQuery.of(context).size.height,
                  width: MediaQuery.of(context).size.width,
                  color: Colors.brown,
                  alignment: Alignment.center,
                  child: Text(
                    "Chào mừng bạn đến với Coffee Order",
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
