// bd/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 登录 API 路由
router.post('/login', authController.login);

module.exports = router;
