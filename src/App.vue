<template>
  <MyPet />
  <div id="app">
    <header class="header">
      <h1>个人主页</h1>
      <p>欢迎来到我的个人主页！</p>
    </header>

    <section class="intro">
      <img class="profile-pic" src="@/assets/1.jpg" alt="Profile Picture" />
      <div class="about">
        <h2>关于我</h2>
        <p>你好，我是狗老师</p>
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

export default {
  name: 'App',
  components: {
   MyPet,
   WordCloud
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
  display: flex;
  flex-direction: column;
  align-items: center;
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

</style>
