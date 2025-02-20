// bd/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// 留言相关 API 路由
router.post('/', messageController.addMessage);  // 提交留言需要登录
router.get('/', messageController.getMessages); // 获取留言不需要登录

module.exports = router;
