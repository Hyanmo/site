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
      console.log('No user found with username:', username);
      return res.status(401).json({ message: 'Invalid username or password', status: 'error' });
    }

    const user = results[0];
    console.log('User found:', user);  // 输出找到的用户信息

    // 使用 bcrypt 比对密码
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log('Password match successful');
      
      const welcomeMessage = user.content || `Welcome back, ${user.username}!`;

      res.json({
        message: 'Login successful',
        status: 'success',
        welcomeMessage: welcomeMessage,
        isGuest: false  // 明确标识为非游客用户
      });
    } else {
      console.log('Password mismatch');
      res.status(401).json({ message: 'Invalid username or password', status: 'error' });
    }
  });
};


// 游客登录 API
exports.guestLogin = (req, res) => {
  console.log('Guest login attempt');
  
  res.json({
    message: 'Guest login successful',
    status: 'success',
    welcomeMessage: '欢迎访问！Welcome to visit!',
    isGuest: true
  });
};

// 权限检查中间件
exports.checkAuth = (req, res, next) => {
  // 检查是否为游客
  if (req.headers.isGuest === 'true') {
    return res.status(401).json({
      status: 'error',
      message: '请登录后使用此功能 / Please login to use this feature'
    });
  }
  next();
};
