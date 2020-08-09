import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'Widgets/Login.dart';
import 'Widgets/PageHolder.dart';

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
        disabledColor: Color(0xFFBEC9CA),
        unselectedWidgetColor: Color(0x8a000000),
      ),
      home: FutureBuilder<SharedPreferences>(
        future: SharedPreferences.getInstance(),
        builder:
            (BuildContext context, AsyncSnapshot<SharedPreferences> snapshot) {
          if (snapshot.hasData) {
            return snapshot.data.getString('jwt') == null
                ? Login()
                : PageHolder();
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
