import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class PostService {
  final String rootUrl = "http://10.3.7.175:4000/posts";

  Future getPosts() async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });

    http.Response res = await http.get(
      rootUrl,
      headers: dataHeaders,
    );

    final decodedRes = jsonDecode(res.body);

    return decodedRes;
  }
}

Future<Map<String, String>> getHeaders() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  final Map<String, String> dataHeaders = {
    "content-type": "application/json",
    "auth-token": prefs.getString('jwt')
  };

  return dataHeaders;
}
