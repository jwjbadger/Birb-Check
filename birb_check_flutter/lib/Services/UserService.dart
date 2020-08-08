import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UserService {
  final String rootUrl = "http://10.3.7.175:4000/users";

  final Map<String, String> dataHeaders = {"content-type": "application/json"};

  Future login(name, pass) async {
    http.Response res = await http.post(
      rootUrl + '/login',
      body: jsonEncode(
        {'name': name, 'password': pass},
      ),
      headers: dataHeaders,
    );

    final decodedRes = jsonDecode(res.body);

    if (decodedRes['err'] == null) {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('jwt', decodedRes['token']);
    }

    return decodedRes;
  }

  Future register(name, pass) async {
    http.Response res = await http.post(
      rootUrl + '/register',
      body: jsonEncode(
        {'name': name, 'password': pass},
      ),
      headers: dataHeaders,
    );

    final decodedRes = jsonDecode(res.body);

    if (decodedRes['err'] == null) {
      return login(name, pass);
    } else {
      return decodedRes;
    }
  }
}
