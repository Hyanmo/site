const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const musicController = require('../controllers/musicController');
const authController = require('../controllers/authController');

// 配置音乐文件上传
const musicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/music/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// 配置封面图片上传
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/covers/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// 音乐文件上传配置
const uploadMusic = multer({
  storage: musicStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('只支持 MP3, WAV 格式的音乐文件'));
    }
  }
});

// 封面图片上传配置
const uploadCover = multer({
  storage: coverStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('只支持 JPG, PNG, GIF, WEBP 格式的图片'));
    }
  }
});

// 路由定义
router.post('/upload/music', 
  (req, res, next) => {
    authController.checkAuth(req, res, () => {
      uploadMusic.single('file')(req, res, (err) => {
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
  musicController.uploadMusic
);

router.post('/upload/cover', 
  (req, res, next) => {
    authController.checkAuth(req, res, () => {
      uploadCover.single('file')(req, res, (err) => {
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
  musicController.uploadCover
);

router.post('/', authController.checkAuth, musicController.addMusic);
router.get('/', musicController.getMusics);  // 游客可以访问
router.delete('/:id', authController.checkAuth, musicController.deleteMusic);

module.exports = router;