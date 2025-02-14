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

    <!-- Display the welcome message with animation -->
    <div v-if="welcomeMessage" class="welcome-message">
      <p>{{ welcomeMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      welcomeMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        // 发送 POST 请求到后端登录接口
        const response = await axios.post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password,
        });

        // 假设响应中有一个 status 字段，表示登录状态
        if (response.data.status === 'success') {
          // 登录成功，存储登录状态
          localStorage.setItem('isLoggedIn', 'true');
          
          // Show the welcome message and fade it in
          this.welcomeMessage = response.data.welcomeMessage;  // Set welcome message
          
          // Use timeout to delay the transition to Profile page
          setTimeout(() => {
            this.$router.push({ name: 'Profile' }); // Ensure Profile page route exists
          }, 3000); // Delay 2 seconds (adjust as needed)
          
          this.errorMessage = '';  // Clear any displayed error messages
        } else {
          // 登录失败，显示错误消息
          this.errorMessage = response.data.message || 'Login failed';
        }
      } catch (error) {
        // 捕获请求错误并显示
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'An error occurred during login';
        } else {
          this.errorMessage = 'An error occurred while trying to login';
        }
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

/* Styling for the welcome message with fade effect */
.welcome-message {
  margin-top: 20px;
  font-size: 18px;
  color: #42b983;
  animation: fadeIn 2s ease-in;
}

/* Fade-in animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
