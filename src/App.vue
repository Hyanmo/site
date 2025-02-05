<template>
  <div id="app">
    <MyPet/>
    <header class="header">
      <h1>个人主页</h1>
      <p>你好，我是狗老师</p>
    </header>

    <section class="intro">
      <div class="profile-left">
        <!-- 左图部分，带超链接 -->
        <a href="https://baidu.com" target="_blank">
          <!-- 使用 HoverZoom 组件 -->
          <HoverZoom 
            :src="require('@/assets/2.jpg')" 
            alt="Profile Picture" 
          />
        </a>
      </div>

      <div class="profile-center">
        <!-- 中图部分，带超链接 -->
        <a href="https://baidu.com" target="_blank">
          <!-- 使用 HoverZoom 组件 -->
          <HoverZoom 
            :src="require('@/assets/3.jpg')" 
            alt="Profile Picture" 
          />
        </a>
      </div>

      <div class="profile-right">
        <!-- 右图部分，带超链接 -->
        <a href="https://baidu.com" target="_blank">
          <!-- 使用 HoverZoom 组件 -->
          <HoverZoom 
            :src="require('@/assets/4.jpg')" 
            alt="Profile Picture" 
          />
        </a>
      </div>
    </section>

    <section class="skills">
      <p>Skills</p>
      <!-- 词云部分保持不变 -->
      <WordCloud />
    </section>

    <section class="about-me">
      <div class="card">
        <h3>教育背景</h3>
        <p>毕业于某大学，主修计算机科学。</p>
      </div>
      <div class="card">
        <h3>兴趣爱好</h3>
        <p>喜欢看电影、跑步和编程。</p>
      </div>
    </section>

    <section class="contact">
      <h2>3D Image Gallery</h2>
      <ul>
        <li>邮箱: example@example.com</li>
        <li>电话: 123-456-7890</li>
        <li>GitHub: <a href="https://github.com/yourusername" target="_blank">yourusername</a></li>
      </ul>
    </section>

    <section class="social-media">
      <a href="https://github.com/yourusername" target="_blank"><i class="fab fa-github"></i></a>
      <a href="https://twitter.com/yourusername" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="https://linkedin.com/in/yourusername" target="_blank"><i class="fab fa-linkedin"></i></a>
    </section>

    <section class="cta">
      <button @click="showMore">了解更多</button>
      <p v-if="isMoreInfoVisible">这里可以是更多的关于我或者其他的内容。</p>
    </section>

    <footer class="footer">
      <p>&copy; 2025 狗老师. 版权所有.</p>
    </footer>
  </div>
</template>

<script>
import MyPet from './components/MyPet.vue'
import WordCloud from './components/WordCloud.vue';
import HoverZoom from './components/HoverZoom.vue';

export default {
  name: 'App',
  components: {
    MyPet,
    WordCloud,  
    HoverZoom
  },
  data() {
    return {
      isMoreInfoVisible: false
    }
  },
  methods: {
    showMore() {
      this.isMoreInfoVisible = !this.isMoreInfoVisible;
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: linear-gradient(45deg, #ff6b6b, #f4f4f4);  /* 渐变背景 */
  color: #333;
}

#app {
  text-align: center;
  padding: 20px;
}

.header {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  opacity: 0;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.intro {
  display: flex;                      /* 使用 Flexbox 布局 */
  justify-content: space-between;     /* 元素之间的间距自动分配 */
  align-items: center;                /* 垂直方向居中 */
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-left a:hover img,
.profile-center a:hover img,
.profile-right a:hover img {
  transform: scale(1.1);  /* 图片放大 */
  transition: transform 0.3s ease; /* 添加平滑过渡 */
}

.skills {
  margin-top: 20px;
  background-color: #ffffff;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  padding: 20px;
  border: 6px solid #4CAF50;
}

.about-me {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin-top: 20px;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 20px;
  color: #4CAF50;
}

.card p {
  font-size: 16px;
  color: #333;
}

.contact {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact a {
  color: #4CAF50;
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.social-media i {
  font-size: 30px;
  color: #4CAF50;
  transition: color 0.3s;
}

.social-media i:hover {
  color: #333;
}

.cta {
  margin-top: 20px;
}

.cta button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.cta button:hover {
  background-color: #45a049;
}

.footer {
  margin-top: 20px;
  background-color: #333;
  color: white;
  padding: 10px;
}

a {
  display: block;
  text-decoration: none;
}

.profile-left, .profile-center, .profile-right {
  display: flex;
  justify-content: center;            /* 水平居中 */
  align-items: center;                /* 垂直居中 */
}

.profile-left a, .profile-center a, .profile-right a {
  display: block;                    /* 使 <a> 标签充满父容器 */
  text-decoration: none;              /* 移除链接下划线 */
}

.profile-left {
  justify-content: flex-start;       /* 左对齐 */
  margin-left: 30px;
}

.profile-center {
  justify-content: center;           /* 居中对齐 */
}

.profile-right {
  justify-content: flex-end;         /* 右对齐 */
  margin-right: 30px;
}

@media (max-width: 768px) {
  .intro {
    flex-direction: column;   /* 在手机端将三列布局改为竖排 */
  }
  .profile-left, .profile-center, .profile-right {
    margin-bottom: 20px;
  }
}
</style>
