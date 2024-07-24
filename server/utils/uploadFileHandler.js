import multer from 'multer';
import path from 'path';

const FILE_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidFormat = FILE_TYPES[file.mimetype];
    let uploadError = new Error('Invalid image type');
    console.log(path.parse(file.originalname).name.replace(/\s+/g, '_'));

    if (isValidFormat) {
      uploadError = null;
    }

    cb(uploadError, 'public/uploads');
  },

  filename: function (req, file, cb) {
    const originalFileName = path
      .parse(file.originalname)
      .name.replace(/\s+/g, '-');
    const uniqueFileName = `${originalFileName}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueFileName);
  },
});

export const upload = multer({ storage: storage });
