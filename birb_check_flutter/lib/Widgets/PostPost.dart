import 'package:birb_check_flutter/Services/PostService.dart';
import 'package:flutter/material.dart';

class PostPost extends StatefulWidget {
  @override
  _PostPostState createState() => _PostPostState();
}

class _PostPostState extends State<PostPost> {
  final PostService _postService = new PostService();

  final _title = TextEditingController();
  final _description = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Post'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
            child: TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Title',
              ),
              controller: _title,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
            child: TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Description',
              ),
              keyboardType: TextInputType.multiline,
              minLines: 1,
              maxLines: 8,
              controller: _description,
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
                onPressed: () {
                  _postService.postPost(
                    title: _title.text,
                    description: _description.text,
                  );
                  Navigator.pop(
                    context,
                  );
                },
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
