const pool = require('../db');
const fs = require('fs');
const path = require('path');

// 处理音乐文件上传 API
exports.uploadMusic = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      status: 'error',
      message: '没有上传文件' 
    });
  }

  // 检查文件类型
  const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      status: 'error',
      message: '只支持 MP3, WAV 格式的音乐文件' 
    });
  }

  // 检查文件大小（20MB）
  const maxSize = 20 * 1024 * 1024;
  if (req.file.size > maxSize) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      status: 'error',
      message: '音乐文件大小不能超过 20MB' 
    });
  }

  const fileUrl = `/uploads/music/${req.file.filename}`;
  res.json({ 
    status: 'success',
    url: fileUrl 
  });
};

// 处理封面图片上传 API
exports.uploadCover = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      status: 'error',
      message: '没有上传文件' 
    });
  }

  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      status: 'error',
      message: '只支持 JPG, PNG, GIF, WEBP 格式的图片' 
    });
  }

  // 检查文件大小（5MB）
  const maxSize = 5 * 1024 * 1024;
  if (req.file.size > maxSize) {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ 
      status: 'error',
      message: '封面图片大小不能超过 5MB' 
    });
  }

  const fileUrl = `/uploads/covers/${req.file.filename}`;
  res.json({ 
    status: 'success',
    url: fileUrl 
  });
};

// 获取所有音乐 API
exports.getMusics = (req, res) => {
  pool.execute('SELECT * FROM musics ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ 
        status: 'error',
        message: '获取音乐列表失败' 
      });
    }
    res.json({ 
      status: 'success',
      musics: results 
    });
  });
};

// 添加音乐信息 API
exports.addMusic = (req, res) => {
  const { title, url, cover, artist, description } = req.body;
  const date = new Date();

  pool.execute(
    'INSERT INTO musics (title, url, cover, artist, description, date) VALUES (?, ?, ?, ?, ?, ?)',
    [title, url, cover, artist, description, date],
    (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ 
          status: 'error',
          message: '保存音乐信息失败' 
        });
      }
      res.json({ 
        status: 'success',
        message: '音乐信息保存成功' 
      });
    }
  );
};

// 删除音乐 API
exports.deleteMusic = (req, res) => {
  const { id } = req.params;

  // 首先获取音乐信息以删除相关文件
  pool.execute('SELECT url, cover FROM musics WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ 
        status: 'error',
        message: '删除音乐失败' 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        status: 'error',
        message: '音乐不存在' 
      });
    }

    // 删除物理文件
    const music = results[0];
    try {
      if (music.url) {
        const musicPath = path.join(__dirname, '..', 'public', music.url);
        if (fs.existsSync(musicPath)) {
          fs.unlinkSync(musicPath);
        }
      }
      if (music.cover) {
        const coverPath = path.join(__dirname, '..', 'public', music.cover);
        if (fs.existsSync(coverPath)) {
          fs.unlinkSync(coverPath);
        }
      }
    } catch (error) {
      console.error('File deletion error:', error);
    }

    // 删除数据库记录
    pool.execute('DELETE FROM musics WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Database delete error:', err);
        return res.status(500).json({ 
          status: 'error',
          message: '删除音乐失败' 
        });
      }
      res.json({ 
        status: 'success',
        message: '音乐删除成功' 
      });
    });
  });
};