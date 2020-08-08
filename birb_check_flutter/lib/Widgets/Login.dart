import 'package:birb_check_flutter/Services/UserService.dart';
import 'package:flutter/material.dart';

import 'PageHolder.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final UserService _userService = new UserService();

  final _username = TextEditingController();
  final _password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Login | Register',
          style: TextStyle(color: Theme.of(context).accentColor),
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
            child: TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Username',
              ),
              controller: _username,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
            child: TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Password',
              ),
              obscureText: true,
              controller: _password,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Padding(
                  padding: const EdgeInsets.only(right: 4),
                  child: RaisedButton(
                    child: Text(
                      'Login',
                      style: TextStyle(color: Theme.of(context).primaryColor),
                    ),
                    color: Theme.of(context).accentColor,
                    onPressed: () {
                      _userService
                          .login(_username.text, _password.text)
                          .then((data) {
                        if (data['err'] == null) {
                          _username.clear();
                          _password.clear();
                          Navigator.push(
                            context,
                            new MaterialPageRoute(
                                builder: (context) => new PageHolder()),
                          );
                        } else {
                          _alertUser(msg: data['err']);
                          _password.clear();
                        }
                      });
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 4),
                  child: RaisedButton(
                    child: Text(
                      'Register',
                      style: TextStyle(color: Theme.of(context).primaryColor),
                    ),
                    color: Theme.of(context).accentColor,
                    onPressed: () {
                      _userService
                          .register(_username.text, _password.text)
                          .then((data) {
                        if (data['err'] == null) {
                          _username.clear();
                          _password.clear();
                          Navigator.push(
                            context,
                            new MaterialPageRoute(
                                builder: (context) => new PageHolder()),
                          );
                        } else {
                          _alertUser(msg: data['err']);
                          _password.clear();
                          _username.clear();
                        }
                      });
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _alertUser({msg: String}) async {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Ooops...'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text(msg),
              ],
            ),
          ),
          actions: <Widget>[
            FlatButton(
              child: Text('Ok'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void dispose() {
    _username.dispose();
    _password.dispose();
    super.dispose();
  }
}
