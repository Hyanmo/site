// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const pool = require('../db'); // 引入 db.js 文件

// 登录 API
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // 输出接收到的请求数据
  console.log('Login attempt with username:', username);

  pool.execute('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Internal server error', status: 'error' });
    }

    if (results.length === 0) {
      console.log('No user found with username:', username);
      return res.status(401).json({ message: 'Invalid username or password', status: 'error' });
    }

    const user = results[0];
    console.log('User found:', user);  // 输出找到的用户信息

    // 使用 bcrypt 比对密码
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // 密码匹配，返回登录成功的响应
      console.log('Password match successful');
      
      // 获取 users 表中的 content 字段作为欢迎语
      const welcomeMessage = user.content || `Welcome back, ${user.username}!`;  // 如果 content 字段为空则使用默认欢迎语

      res.json({
        message: 'Login successful',
        status: 'success',
        welcomeMessage: welcomeMessage  // 动态欢迎语
      });
    } else {
      console.log('Password mismatch');
      res.status(401).json({ message: 'Invalid username or password', status: 'error' });
    }
  });
};
