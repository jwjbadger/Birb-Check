import 'dart:convert';
import 'package:birb_check_flutter/Models/ImagePost.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ImageService {
  final String rootUrl = "http://10.3.7.24:4000/images";

  Future<List<ImagePost>> getPosts() async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });
    http.Response res = await http.get(
      rootUrl,
      headers: dataHeaders,
    );

    final decodedRes = imageDecode(jsonDecode(res.body));

    return decodedRes;
  }
}

List<ImagePost> imageDecode(body) {
  List<ImagePost> result = [];

  for (var post in body) {
    result.add(new ImagePost(
        url: post['imageUrl'].replaceAll('localhost', '10.3.7.24'),
        author: post['author']));
  }

  return result;
}

Future<Map<String, String>> getHeaders() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  final Map<String, String> dataHeaders = {
    "content-type": "application/json",
    "auth-token": prefs.getString('jwt')
  };

  return dataHeaders;
}
