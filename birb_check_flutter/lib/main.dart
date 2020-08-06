import 'package:flutter/material.dart';

void main() {
  runApp(Birb());
}

class Birb extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BirbHomePage(),
    );
  }
}

class BirbHomePage extends StatefulWidget {
  @override
  _BirbHomePageState createState() => _BirbHomePageState();
}

class _BirbHomePageState extends State<BirbHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
    );
  }
}
