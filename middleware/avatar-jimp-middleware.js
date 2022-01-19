const Jimp = require('jimp');
const path = require('path');
const avatarNormalize = (req, res, next) => {
  const newFilename = `${req.user._id}-avatar.jpg`;
  const newPath = path.join('public/avatars', newFilename);
  const newUrl = path.join('avatars', newFilename);
  req.avatarURL = newUrl;
  Jimp.read(req.file.path)
    .then((originalname) => {
      return originalname
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(newPath); // save
    })
    .catch((err) => {
      console.error(err);
    });
  next();
};

module.exports = {
  avatarNormalize,
};
