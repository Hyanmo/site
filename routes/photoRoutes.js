const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const photoController = require('../controllers/photoController');
const authController = require('../controllers/authController');

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/photo');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'));
    }
  }
});

// 注册路由
router.post('/', authController.checkAuth, photoController.addPhoto);
router.get('/', photoController.getPhotos);
router.post('/upload', 
  (req, res, next) => {
    // 确保在文件上传前进行权限检查
    authController.checkAuth(req, res, () => {
      upload.single('file')(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            status: 'error',
            message: err.message
          });
        }
        next();
      });
    });
  }, 
  photoController.uploadPhoto
);
router.delete('/:id', authController.checkAuth, photoController.deletePhoto);

module.exports = router;