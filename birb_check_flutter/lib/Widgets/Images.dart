import 'dart:io';

import 'package:birb_check_flutter/Models/ImagePost.dart';
import 'package:birb_check_flutter/Services/ImageService.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImageView extends StatefulWidget {
  @override
  _ImagesViewState createState() => _ImagesViewState();
}

class _ImagesViewState extends State<ImageView> {
  final ImageService _imageService = new ImageService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Images',
          style: TextStyle(color: Theme.of(context).accentColor),
        ),
      ),
      body: FutureBuilder(
          future: _imageService.getPosts(),
          builder:
              (BuildContext context, AsyncSnapshot<List<ImagePost>> snapshot) {
            if (snapshot.hasData) {
              List<ImagePost> images = snapshot.data;
              return Scaffold(
                floatingActionButton: FloatingActionButton(
                  onPressed: () {
                    _pickImage().then((val) {
                      _imageService.postImage(val).then((val) {
                        _imageService.getPosts().then((val) {
                          setState(() {
                            images = val;
                          });
                        });
                      });
                    });
                  },
                  child: Icon(
                    Icons.add,
                  ),
                ),
                body: ListView.builder(
                  itemCount: images.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Padding(
                      padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Theme.of(context).primaryColor,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Image.network(images[index].url),
                        ),
                      ),
                    );
                  },
                ),
              );
            } else {
              return CircularProgressIndicator();
            }
          }),
    );
  }

  Future<String> _pickImage() async {
    final pickedFile = await ImagePicker().getImage(source: ImageSource.camera);
    return pickedFile.path;
  }
}
