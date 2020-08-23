import 'dart:convert';
import 'package:birb_check_flutter/Models/ImagePost.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
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

  Future<void> postImage(String filename) async {
    http.MultipartRequest post =
        new http.MultipartRequest("POST", Uri.parse(rootUrl));
    post.files.add(await http.MultipartFile.fromPath(
      'image',
      filename,
      contentType: filename.split('.').last == 'jpg'
          ? new MediaType('image', 'jpeg')
          : filename.split('.').last == 'jpeg'
              ? MediaType('image', 'jpeg')
              : filename.split('.').last == 'png'
                  ? MediaType('image', 'png')
                  : filename.split('.').last == 'gif'
                      ? MediaType('image', 'gif')
                      : MediaType('image', 'jpeg'),
    ));

    await getHeaders().then((data) {
      post.headers['auth-token'] = data['auth-token'];
    });

    post.send().then((val) {
      return;
    });
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
