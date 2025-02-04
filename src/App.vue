<template>
  <MyPet />
  <div id="app">
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
      <p>skills</p>
      <WordCloud/>
    </section>

    <section class="contact">
      <h2>3D Image Gallery</h2>
      <ul>
        <li>邮箱: example@example.com</li>
        <li>电话: 123-456-7890</li>
        <li>GitHub: <a href="https://github.com/yourusername" target="_blank">yourusername</a></li>
      </ul>
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
  background-color: #f4f4f4;
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


.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.about {
  max-width: 600px;
  margin: 0 auto;
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
</style>
