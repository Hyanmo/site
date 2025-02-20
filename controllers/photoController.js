// backend/controllers/photoController.js
const pool = require('../db');
const fs = require('fs');
const path = require('path');

// 处理文件上传 API
exports.uploadPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      status: 'error',
      message: '没有上传文件' 
    });
  }

  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    // 删除不符合要求的文件
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      status: 'error',
      message: '只支持 JPG, PNG, GIF, WEBP 格式的图片' 
    });
  }

  // 检查文件大小（5MB）
  const maxSize = 5 * 1024 * 1024;
  if (req.file.size > maxSize) {
    // 删除超大文件
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      status: 'error',
      message: '图片大小不能超过 5MB' 
    });
  }

  const fileUrl = `/uploads/photo/${req.file.filename}`;
  res.json({ 
    status: 'success',
    url: fileUrl 
  });
};

// 获取所有照片 API
exports.getPhotos = (req, res) => {
  pool.execute('SELECT * FROM photo_logs ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ 
        status: 'error',
        message: '获取照片列表失败' 
      });
    }
    res.json({ 
      status: 'success',
      photos: results 
    });
  });
};

// 添加照片信息 API
exports.addPhoto = (req, res) => {
  const { title, description, src } = req.body;
  const date = new Date();

  pool.execute(
    'INSERT INTO photo_logs (title, description, src, date) VALUES (?, ?, ?, ?)',
    [title, description, src, date],
    (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ 
          status: 'error',
          message: '保存照片信息失败' 
        });
      }
      res.json({ 
        status: 'success',
        message: '照片信息保存成功' 
      });
    }
  );
};

// 删除照片 API
exports.deletePhoto = (req, res) => {
  const { id } = req.params;

  // 先查询照片信息，获取文件路径
  pool.execute('SELECT src FROM photo_logs WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ 
        status: 'error',
        message: '删除照片失败' 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        status: 'error',
        message: '照片不存在' 
      });
    }

    // 删除本地文件
    const photoPath = path.join(__dirname, '..', 'public', results[0].src);
    try {
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    } catch (error) {
      console.error('File deletion error:', error);
    }

    // 删除数据库记录
    pool.execute('DELETE FROM photo_logs WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Database delete error:', err);
        return res.status(500).json({ 
          status: 'error',
          message: '删除照片失败' 
        });
      }
      res.json({ 
        status: 'success',
        message: '照片删除成功' 
      });
    });
  });
};