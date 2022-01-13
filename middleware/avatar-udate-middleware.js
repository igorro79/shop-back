const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const avatarUpdateMiddleware = multer({ storage });

module.exports = {
  avatarUpdateMiddleware,
};
