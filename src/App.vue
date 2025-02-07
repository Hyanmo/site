<template>
  <div id="app">
    <header>
      <h1>Welcome to My Vue App</h1>
      <nav>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link> |
        <router-link v-if="isLoggedIn" to="/profile">Profile</router-link>
      </nav>
       <!-- 显示退出按钮 -->
      <button v-if="isLoggedIn" @click="handleLogout">Logout</button>
    </header>

    <!-- 路由出口：根据路由切换显示页面 -->
    <router-view></router-view>

    <footer>
      <p>&copy; 2025 My Vue App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,  // 登录状态
    };
  },
  watch: {
    // 监听路由变化，当用户登录时设置 isLoggedIn 为 true
    $route(to) {
      if (to.name === 'Profile') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
  },
  methods: {
    handleLogout() {
      // 清除本地存储中的登录状态
      localStorage.removeItem('isLoggedIn');
      // 设置登录状态为 false
      this.isLoggedIn = false;
      // 跳转到登录页面
      this.$router.push({ name: 'UserLogin' });
    },
  },
  created() {
    // 页面初始化时，检查登录状态
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style scoped>
/* 样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

header {
  background-color: #42b983;
  padding: 20px;
  color: white;
}

nav {
  margin-top: 10px;
}

button {
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #d32f2f;
}

footer {
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}
</style>
