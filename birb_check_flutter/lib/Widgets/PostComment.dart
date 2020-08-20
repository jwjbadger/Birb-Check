import 'package:birb_check_flutter/Services/PostService.dart';
import 'package:flutter/material.dart';

class PostComment extends StatefulWidget {
  @override
  _PostCommentState createState() => _PostCommentState();
}

class _PostCommentState extends State<PostComment> {
  final PostService _postService = new PostService();

  final _body = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Comment'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
            child: TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Body',
              ),
              keyboardType: TextInputType.multiline,
              minLines: 1,
              maxLines: 8,
              controller: _body,
            ),
          ),
          Row(
            children: [
              FlatButton(
                onPressed: () {
                  Navigator.pop(
                    context,
                  );
                },
                child: Text(
                  'Cancel',
                  style: TextStyle(color: Theme.of(context).primaryColor),
                ),
              ),
              RaisedButton(
                onPressed: () {},
                color: Theme.of(context).accentColor,
                child: Text(
                  'Submit',
                  style: TextStyle(color: Theme.of(context).primaryColor),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
