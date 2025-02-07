const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');  // 导入 bcrypt
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Aa123456*',
  database: 'user_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 检查数据库连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
  connection.release();  // 释放连接
});

// 登录 API（加密密码比对）
app.post('/login', (req, res) => {
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

    // 使用 bcrypt 比对用户输入的密码和数据库中的加密密码
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({ message: 'Login successful', status: 'success' });
    } else {
      res.status(401).json({ message: 'Invalid username or password', status: 'error' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
