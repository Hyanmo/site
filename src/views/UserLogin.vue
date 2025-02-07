<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <!-- 显示错误信息 -->
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      // 假设正确的用户名和密码
      const correctUsername = 'admin';
      const correctPassword = 'password123';

      // 检查用户名和密码是否正确
      if (this.username === correctUsername && this.password === correctPassword) {
        // 登录成功，存储登录状态
        localStorage.setItem('isLoggedIn', 'true');
        this.$router.push({ name: 'Profile' });
        this.errorMessage = '';  // 清除错误信息
      } else {
        // 显示错误信息
        this.errorMessage = 'Invalid username or password';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 15px;
}

input {
  padding: 10px;
  width: 100%;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #367c57;
}
</style>
