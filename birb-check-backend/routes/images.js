const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:|\./g, '') +
        '.' +
        file.originalname.split('.')[1],
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(Error('Inproper file type (try jpg, png, or gif)'), false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 15 },
  fileFilter: fileFilter,
});

const jwt = require('jsonwebtoken');

const verify = require('../verify');

const Images = require('../models/image');
const Users = require('../models/users');

router.get('/', verify.verify, async (req, res) => {
  try {
    const images = await Images.find({});
    return res.status(200).json(images);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', verify.verify, upload.single('image'), async (req, res) => {
  try {
    const user = await Users.findById(jwt.decode(req.header('auth-token'))._id);

    const ImageToSave = new Images({
      author: { name: user.name },
      imageUrl: 'localhost:4000/' + req.file.path,
    });
    const savedImage = await ImageToSave.save();
    res.status(200).json(savedImage);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Export
module.exports = router;
