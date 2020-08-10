import 'package:flutter/foundation.dart';
import 'package:birb_check_flutter/Models/Comment.dart';

class Post {
  Map author;
  String title;
  String description;
  List<Comment> comments;
  List upvotes;
  List downvotes;

  Post(
      {@required this.author,
      @required this.title,
      @required this.description,
      @required this.comments,
      @required this.upvotes,
      @required this.downvotes});
}
