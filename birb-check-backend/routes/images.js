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

router.post('/', verify.verify, upload.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: 'localhost:4000/' + req.file.path });
});

// Export
module.exports = router;
