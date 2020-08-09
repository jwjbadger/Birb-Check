import 'package:birb_check_flutter/Widgets/Posts.dart';
import 'package:flutter/material.dart';

class PageHolder extends StatefulWidget {
  @override
  _PageHolder createState() => _PageHolder();
}

class _PageHolder extends State<PageHolder> {
  int _currentNav = 0;

  static List<Widget> _widgets = <Widget>[
    Posts(),
    Text('Birbs'),
    Text('Settings'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Scaffold(
          body: _widgets.elementAt(_currentNav),
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentNav,
            type: BottomNavigationBarType.fixed,
            items: [
              BottomNavigationBarItem(
                icon: Icon(Icons.message),
                title: Text('Posts'),
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.perm_media),
                title: Text('Images'),
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.settings),
                title: Text('Settings'),
              ),
            ],
            selectedItemColor: Theme.of(context).accentColor,
            unselectedItemColor: Theme.of(context).unselectedWidgetColor,
            backgroundColor: Theme.of(context).primaryColor,
            onTap: (index) {
              setState(
                () {
                  _currentNav = index;
                },
              );
            },
          ),
        ),
      ),
    );
  }
}
