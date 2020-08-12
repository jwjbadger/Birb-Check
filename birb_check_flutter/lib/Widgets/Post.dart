import 'package:birb_check_flutter/Models/Post.dart';
import 'package:birb_check_flutter/Services/PostService.dart';
import 'package:flutter/material.dart';

class PostView extends StatefulWidget {
  final Post post;

  PostView({Key key, @required this.post}) : super(key: key);

  @override
  _PostViewState createState() => _PostViewState();
}

class _PostViewState extends State<PostView> {
  final PostService _postService = new PostService();

  @override
  Widget build(BuildContext context) {
    print(widget.post.title);
    return Scaffold();
  }
}
