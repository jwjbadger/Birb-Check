import 'dart:convert';
import 'package:birb_check_flutter/Models/Comment.dart';
import 'package:birb_check_flutter/Models/Post.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class PostService {
  final String rootUrl = "http://10.3.7.24:4000/posts";

  Future<List<Post>> getPosts() async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });
    http.Response res = await http.get(
      rootUrl,
      headers: dataHeaders,
    );

    final decodedRes = postsDecode(jsonDecode(res.body));

    return decodedRes;
  }

  Future<Post> getPost(_id) async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });

    http.Response res = await http.get(
      rootUrl + '/' + _id,
      headers: dataHeaders,
    );

    final decodedRes = postDecode(jsonDecode(res.body));

    return decodedRes;
  }

  Future<Post> postPost({title: String, description: String}) async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });

    http.Response res = await http.post(
      rootUrl + '/',
      body: jsonEncode({
        'title': title ? title : 'No title',
        'description': description ? description : 'No description',
      }),
      headers: dataHeaders,
    );

    final decodedRes = postDecode(jsonDecode(res.body));

    return decodedRes;
  }

  Future upvotePost(_id) async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });

    http.Response res = await http.patch(
      rootUrl + '/vote/up/' + _id,
      headers: dataHeaders,
    );

    return;
  }

  Future downvotePost(_id) async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });

    http.Response res = await http.patch(
      rootUrl + '/vote/down/' + _id,
      headers: dataHeaders,
    );

    return;
  }

  Future unvotePost(_id) async {
    Map<String, String> dataHeaders = {};
    await getHeaders().then((data) {
      dataHeaders = data;
    });

    http.Response res = await http.patch(
      rootUrl + '/vote/remove/' + _id,
      headers: dataHeaders,
    );

    return;
  }
}

List<Post> postsDecode(List posts) {
  List<Post> result = [];

  for (var post in posts) {
    result.add(postDecode(post));
  }

  return result;
}

Post postDecode(Map post) {
  return new Post(
    id: post['_id'],
    author: post['author'],
    title: post['title'],
    description: post['description'],
    comments: commentsDecode(post['comments']),
    upvotes: post['upvotes'],
    downvotes: post['downvotes'],
  );
}

List<Comment> commentsDecode(List comments) {
  List<Comment> result = [];

  for (var comment in comments) {
    result.add(commentDecode(comment));
  }

  return result;
}

Comment commentDecode(Map comment) {
  return new Comment(
    id: comment['id'],
    author: comment['author'],
    body: comment['body'],
    upvotes: comment['upvotes'],
    downvotes: comment['downvotes'],
  );
}

Map postEncode(Post post) {
  return {
    'author': post.author,
    'title': post.title,
    'description': post.description,
    'comments': commentsEncode(post.comments),
    'upvotes': post.upvotes,
    'downvotes': post.downvotes,
  };
}

List<Map> commentsEncode(List comments) {
  List<Map> result = [];

  for (var comment in comments) {
    result.add(commentEncode(comment));
  }

  return result;
}

Map commentEncode(Comment comment) {
  return {
    'author': comment.author,
    'body': comment.body,
    'upvotes': comment.upvotes,
    'downvotes': comment.downvotes,
  };
}

Future<Map<String, String>> getHeaders() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  final Map<String, String> dataHeaders = {
    "content-type": "application/json",
    "auth-token": prefs.getString('jwt')
  };

  return dataHeaders;
}
