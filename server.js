// bd/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');  // 引入 db.js 文件
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 检查数据库连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
  connection.release(); // 释放连接
});

// 引入路由
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

// 使用路由
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
