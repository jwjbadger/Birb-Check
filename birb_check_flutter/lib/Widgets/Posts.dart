import 'package:birb_check_flutter/Models/Post.dart';
import 'package:birb_check_flutter/Services/PostService.dart';
import 'package:flutter/material.dart';

class Posts extends StatefulWidget {
  @override
  _PostsState createState() => _PostsState();
}

class _PostsState extends State<Posts> {
  final PostService _postService = new PostService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Posts',
          style: TextStyle(color: Theme.of(context).accentColor),
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
                              onTap: () {},
                            ),
                            InkWell(
                              child: Container(
                                child: Icon(
                                  Icons.keyboard_arrow_down,
                                  color:
                                      Theme.of(context).unselectedWidgetColor,
                                ),
                              ),
                              onTap: () {},
                            ),
                          ],
                        ),
                      ],
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
