// backend/controllers/messageController.js
const pool = require('../db'); // 引入 db.js 文件

// 提交留言 API
exports.addMessage = (req, res) => {
  const { username, content } = req.body;
  const date = new Date();

  pool.execute('INSERT INTO messages (username, content, date) VALUES (?, ?, ?)', [username, content, date], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error saving message', status: 'error' });
    }
    res.json({ message: 'Message saved successfully', status: 'success' });
  });
};

// 获取留言 API
exports.getMessages = (req, res) => {
  pool.execute('SELECT * FROM messages ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error fetching messages', status: 'error' });
    }
    res.json({ messages: results, status: 'success' });
  });
};
