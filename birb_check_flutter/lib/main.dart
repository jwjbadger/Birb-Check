import 'package:flutter/material.dart';

import 'Widgets/Login.dart';

void main() {
  runApp(Birb());
}

class Birb extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Birb Check',
      theme: ThemeData(
          backgroundColor: Color(0xFFFBFCFD),
          accentColor: Color(0xFFDEEFED),
          primaryColor: Color(0xFF93A7A6),
          disabledColor: Color(0xFFBEC9CA)),
      home: Login(),
    );
  }
}
