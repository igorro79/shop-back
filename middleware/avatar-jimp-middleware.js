const Jimp = require('jimp');
const path = require('path');
const avatarNormalize = (req, res, next) => {
  const newPath = path.resolve('public/avatars');
  // newFilename path made for windows OS !!!!!!!!!!!!!
  const newFilename = newPath + `\\${req.user._id}-avatar.jpg`;
  req.avatarURL = newFilename;
  Jimp.read(req.file.path)
    .then((originalname) => {
      return originalname
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(newFilename); // save
    })
    .catch((err) => {
      console.error(err);
    });
  next();
};

module.exports = {
  avatarNormalize,
};
