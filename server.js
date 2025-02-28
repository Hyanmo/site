const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const pool = require('./db');  // 引入 db.js 文件
const path = require('path');
const app = express();
const port = 3000;

// 允许信任来自代理服务器（如 Nginx）的请求头
app.set('trust proxy', true);

// CORS 配置
const corsOptions = {
    origin: 'https://www.uangh0807.online',  // 前端的 URL，确保前端和后端同域名
    methods: ['GET,POST,PUT,DELETE'],
    allowedHeaders: 'Content-Type, Authorization,isGuest'
};
app.use(cors(corsOptions));

// 解析 JSON 请求体
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
const photoRoutes = require('./routes/photoRoutes');
const musicRoutes = require('./routes/musicRoutes');

// 配置静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/uploads/photo', express.static(path.join(__dirname, 'public/uploads/photo')));
app.use('/uploads/music', express.static(path.join(__dirname, 'public/uploads/music')));
app.use('/uploads/covers', express.static(path.join(__dirname, 'public/uploads/covers')));

// 使用路由
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.use('/photos', photoRoutes);  
app.use('/music', musicRoutes);

// SSL 配置
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/uangh0807.online/privkey.pem'),  // 私钥
  cert: fs.readFileSync('/etc/letsencrypt/live/uangh0807.online/fullchain.pem'),  // 证书
};

// 启动 HTTPS 服务器
https.createServer(sslOptions, app).listen(3000, () => {
  console.log(`Server running at https://localhost:${port}`);
});
