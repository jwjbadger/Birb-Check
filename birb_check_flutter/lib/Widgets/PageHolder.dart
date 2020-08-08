import 'package:flutter/material.dart';

class PageHolder extends StatefulWidget {
  @override
  _PageHolder createState() => _PageHolder();
}

class _PageHolder extends State<PageHolder> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Test'),
      ),
    );
  }
}
