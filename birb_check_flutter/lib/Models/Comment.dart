import 'package:flutter/foundation.dart';

class Comment {
  String id;
  Map author;
  String body;
  List upvotes;
  List downvotes;

  Comment(
      {@required this.id,
      @required this.author,
      @required this.body,
      @required this.upvotes,
      @required this.downvotes});
}
