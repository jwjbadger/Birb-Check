import 'package:birb_check_flutter/Models/Post.dart';
import 'package:birb_check_flutter/Services/PostService.dart';
import 'package:birb_check_flutter/Services/UserService.dart';
import 'package:flutter/material.dart';

class PostView extends StatefulWidget {
  final Post post;

  PostView({Key key, @required this.post}) : super(key: key);

  @override
  _PostViewState createState() => _PostViewState();
}

class _PostViewState extends State<PostView> {
  final PostService _postService = new PostService();
  final UserService _userService = new UserService();

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
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
            child: Container(
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
                borderRadius: BorderRadius.circular(4),
              ),
              child: Column(
                children: [
                  Text(
                    widget.post.description,
                    style: TextStyle(
                      color: Theme.of(context).accentColor,
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
                        onTap: () {
                          _userService.getUser().then((val) {
                            if (!widget.post.upvotes.contains(val) &&
                                !widget.post.downvotes.contains(val)) {
                              _postService
                                  .upvotePost(widget.post.id)
                                  .then((val) {
                                _postService
                                    .getPost(widget.post.id)
                                    .then((val) {
                                  setState(() {
                                    widget.post.upvotes = val.upvotes;
                                    widget.post.downvotes = val.downvotes;
                                  });
                                });
                              });
                            }
                            if (widget.post.downvotes.contains(val)) {
                              _postService
                                  .unvotePost(widget.post.id)
                                  .then((val) {
                                _postService
                                    .upvotePost(widget.post.id)
                                    .then((val) {
                                  _postService
                                      .getPost(widget.post.id)
                                      .then((val) {
                                    setState(() {
                                      widget.post.upvotes = val.upvotes;
                                      widget.post.downvotes = val.downvotes;
                                    });
                                  });
                                });
                              });
                            }
                            if (widget.post.upvotes.contains(val)) {
                              _postService
                                  .unvotePost(widget.post.id)
                                  .then((val) {
                                _postService
                                    .getPost(widget.post.id)
                                    .then((val) {
                                  setState(() {
                                    widget.post.upvotes = val.upvotes;
                                    widget.post.downvotes = val.downvotes;
                                  });
                                });
                              });
                            }
                          });
                        },
                      ),
                      InkWell(
                        child: Container(
                          child: Icon(
                            Icons.keyboard_arrow_down,
                            color: Theme.of(context).unselectedWidgetColor,
                          ),
                        ),
                        onTap: () {
                          _userService.getUser().then((val) {
                            if (!widget.post.upvotes.contains(val) &&
                                !widget.post.downvotes.contains(val)) {
                              _postService
                                  .downvotePost(widget.post.id)
                                  .then((val) {
                                _postService
                                    .getPost(widget.post.id)
                                    .then((val) {
                                  setState(() {
                                    widget.post.upvotes = val.upvotes;
                                    widget.post.downvotes = val.downvotes;
                                  });
                                });
                              });
                            }
                            if (widget.post.upvotes.contains(val)) {
                              _postService
                                  .unvotePost(widget.post.id)
                                  .then((val) {
                                _postService
                                    .downvotePost(widget.post.id)
                                    .then((val) {
                                  _postService
                                      .getPost(widget.post.id)
                                      .then((val) {
                                    setState(() {
                                      widget.post.upvotes = val.upvotes;
                                      widget.post.downvotes = val.downvotes;
                                    });
                                  });
                                });
                              });
                            }
                            if (widget.post.downvotes.contains(val)) {
                              _postService
                                  .unvotePost(widget.post.id)
                                  .then((val) {
                                _postService
                                    .getPost(widget.post.id)
                                    .then((val) {
                                  setState(() {
                                    widget.post.upvotes = val.upvotes;
                                    widget.post.downvotes = val.downvotes;
                                  });
                                });
                              });
                            }
                          });
                        },
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
          ),
          ListView.builder(
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemCount: widget.post.comments.length,
            itemBuilder: (BuildContext context, int index) {
              final comment = widget.post.comments[index];
              return Padding(
                padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).primaryColor,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(left: 4),
                        child: Text(
                          comment.body,
                          style: TextStyle(
                            color: Theme.of(context).unselectedWidgetColor,
                          ),
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
                              'By: ${comment.author['name']}',
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
                              '${comment.upvotes.length - comment.downvotes.length} Internet Point(s)',
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
              );
            },
          ),
        ],
      ),
    );
  }
}
