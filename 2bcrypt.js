const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Aa123456*',
  database: 'user_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 查询所有用户并加密密码
pool.execute('SELECT * FROM users', async (err, results) => {
  if (err) {
    console.error('Database query error:', err);
    pool.end(); // 如果查询失败，关闭连接池
    return;
  }

  // 使用 Promise.all 等待所有更新操作完成
  const updatePromises = results.map(async (user) => {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10); // 加密密码

      // 更新数据库中的密码为加密后的密码
      await new Promise((resolve, reject) => {
        pool.execute('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, user.username], (err) => {
          if (err) {
            console.error('Error updating password for user', user.username, err);
            reject(err);
          } else {
            console.log(`Password updated for user: ${user.username}`);
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Error hashing password for user', user.username, error);
    }
  });

  try {
    // 等待所有更新操作完成
    await Promise.all(updatePromises);
    console.log('All passwords updated successfully');
  } catch (error) {
    console.error('Error updating some passwords:', error);
  } finally {
    pool.end(); // 关闭连接池
  }
});
