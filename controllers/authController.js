// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const pool = require('../db'); // 引入 db.js 文件

// 登录 API
exports.login = async (req, res) => {
  const { username, password } = req.body;

  pool.execute('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Internal server error', status: 'error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password', status: 'error' });
    }

    const user = results[0];

    // 使用 bcrypt 比对密码
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({ message: 'Login successful', status: 'success' });
    } else {
      res.status(401).json({ message: 'Invalid username or password', status: 'error' });
    }
  });
};
