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
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.post.title,
          style: TextStyle(
            color: Theme.of(context).accentColor,
          ),
        ),
      ),
      body: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Column(
              children: [
                Text(
                  widget.post.description,
                  style: TextStyle(
                    color: Theme.of(context).unselectedWidgetColor,
                  ),
                ),
                Row(
                  children: [
                    InkWell(
                      child: Container(
                        child: Icon(
                          Icons.keyboard_arrow_up,
                          color: Theme.of(context).unselectedWidgetColor,
                        ),
                      ),
                      onTap: () {},
                    ),
                    InkWell(
                      child: Container(
                        child: Icon(
                          Icons.keyboard_arrow_down,
                          color: Theme.of(context).unselectedWidgetColor,
                        ),
                      ),
                      onTap: () {},
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 4),
                      child: Text(
                        'By: ${widget.post.author['name']}',
                        style: TextStyle(
                          fontSize: 11,
                          color: Theme.of(context).unselectedWidgetColor,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 4),
                      child: Text(
                        '${widget.post.upvotes.length - widget.post.downvotes.length} Internet Point(s)',
                        style: TextStyle(
                          fontSize: 11,
                          color: Theme.of(context).unselectedWidgetColor,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
