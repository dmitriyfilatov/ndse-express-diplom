const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    let date = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${date}-${file.originalname}`);
  },
});

const allowedTypes = [
  'application/pdf',
  'image/jpg',
  'image/jpeg',
  'image/png',
];
const fileFilter = (req, file, cb) => {
  cb(null, allowedTypes);
};

module.exports = multer({ storage, fileFilter });
