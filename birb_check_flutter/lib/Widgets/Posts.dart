import 'package:birb_check_flutter/Models/Post.dart';
import 'package:birb_check_flutter/Services/PostService.dart';
import 'package:birb_check_flutter/Services/UserService.dart';
import 'package:birb_check_flutter/Widgets/Post.dart';
import 'package:flutter/material.dart';

import 'PostPost.dart';

class Posts extends StatefulWidget {
  @override
  _PostsState createState() => _PostsState();
}

class _PostsState extends State<Posts> {
  final PostService _postService = new PostService();
  final UserService _userService = new UserService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Posts',
          style: TextStyle(color: Theme.of(context).accentColor),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            new MaterialPageRoute(
              builder: (context) => new PostPost(),
            ),
          ).then((val) {
            setState(() {});
          });
        },
        child: Icon(
          Icons.add,
        ),
      ),
      body: FutureBuilder(
        future: _postService.getPosts(),
        builder: (BuildContext context, AsyncSnapshot<List<Post>> snapshot) {
          if (snapshot.hasData) {
            List<Post> posts = snapshot.data;

            return ListView.builder(
              itemCount: posts.length,
              itemBuilder: (BuildContext context, int index) {
                Post post = posts[index];
                return Padding(
                  padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
                  child: Container(
                    decoration: BoxDecoration(
                      color: Theme.of(context).primaryColor,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => PostView(post: post),
                          ),
                        ).then((val) {
                          setState(() {});
                        });
                      },
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Wrap(
                            direction: Axis.horizontal,
                            crossAxisAlignment: WrapCrossAlignment.end,
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(left: 4),
                                child: Text(
                                  post.title,
                                  style: TextStyle(
                                    fontSize: 13,
                                    color:
                                        Theme.of(context).unselectedWidgetColor,
                                  ),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(left: 4),
                                child: Text(
                                  'By: ${post.author['name']}',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color:
                                        Theme.of(context).unselectedWidgetColor,
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(left: 4),
                                child: Text(
                                  '${post.upvotes.length - post.downvotes.length} Internet Point(s)',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color:
                                        Theme.of(context).unselectedWidgetColor,
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              InkWell(
                                child: Container(
                                  child: Icon(
                                    Icons.keyboard_arrow_up,
                                    color:
                                        Theme.of(context).unselectedWidgetColor,
                                  ),
                                ),
                                onTap: () {
                                  _userService.getUser().then((val) {
                                    if (!post.upvotes.contains(val) &&
                                        !post.downvotes.contains(val)) {
                                      _postService
                                          .upvotePost(post.id)
                                          .then((val) {
                                        setState(() {});
                                      });
                                    }
                                    if (post.downvotes.contains(val)) {
                                      _postService
                                          .unvotePost(post.id)
                                          .then((val) {
                                        _postService
                                            .upvotePost(post.id)
                                            .then((val) {
                                          setState(() {});
                                        });
                                      });
                                    }
                                    if (post.upvotes.contains(val)) {
                                      _postService
                                          .unvotePost(post.id)
                                          .then((val) {
                                        setState(() {});
                                      });
                                    }
                                  });
                                },
                              ),
                              InkWell(
                                child: Container(
                                  child: Icon(
                                    Icons.keyboard_arrow_down,
                                    color:
                                        Theme.of(context).unselectedWidgetColor,
                                  ),
                                ),
                                onTap: () {
                                  _userService.getUser().then((val) {
                                    if (!post.upvotes.contains(val) &&
                                        !post.downvotes.contains(val)) {
                                      _postService
                                          .downvotePost(post.id)
                                          .then((val) {
                                        setState(() {});
                                      });
                                    }
                                    if (post.upvotes.contains(val)) {
                                      _postService
                                          .unvotePost(post.id)
                                          .then((val) {
                                        _postService
                                            .downvotePost(post.id)
                                            .then((val) {
                                          setState(() {});
                                        });
                                      });
                                    }
                                    if (post.downvotes.contains(val)) {
                                      _postService
                                          .unvotePost(post.id)
                                          .then((val) {
                                        setState(() {});
                                      });
                                    }
                                  });
                                },
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            );
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}
