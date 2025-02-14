<template>
  <div id="app">
    <MyPet />
    <header class="header">
      <h1>狗老师的秘密基地</h1>
      <p>你好，我是狗老师</p>
    </header>

    <section class="intro">
      <div class="profile-left">
        <router-link to="/profile/sudoku-game1" class="hover-container">
          <HoverZoom :src="require('@/assets/2.jpg')" :backSrc="require('@/assets/6.jpg')" alt="Profile Picture"
            backAlt="Back Picture" />
        </router-link>
        <p class="profile-text">Sudoku-game</p>
      </div>

      <div class="profile-center">
        <router-link to="/profile/photo-gallery" class="hover-container">
          <HoverZoom :src="require('@/assets/3.jpg')" :backSrc="require('@/assets/5.jpg')" alt="Profile Picture"
            backAlt="Back Picture" />
        </router-link>
        <p class="profile-text">photo</p>
      </div>

      <div class="profile-right">
        <router-link to="/profile/music-play" class="hover-container">
          <HoverZoom :src="require('@/assets/4.jpg')" :backSrc="require('@/assets/1.jpg')" alt="Profile Picture"
            backAlt="Back Picture" />
        </router-link>
        <p class="profile-text">music</p>
      </div>
    </section>
    <router-view></router-view>


    <!-- Emotion Section -->
    <section class="emotion">
      <h2 class="emotion-title">我的秘密基地</h2>
      <div class="emotion-content">
        <p>欢迎来到狗老师的秘密基地，因为在学习vue，就想着能不能做一个网页和朋友们一起互动。</p>
        <p>在这里，你可以与我一起分享故事和音乐，希望你天天开心～</p>
      </div>
      <div class="emotion-animation">
        <img src="@/assets/image/Emotion.gif" alt="Heart Animation" />
      </div>
      <Emotion />
    </section>

    <!-- 留言板 -->
    <section class="contact">
      <MessageBoard />
    </section>

    <section class="social-media">
      <a href="https://github.com/Hyanmo" target="_blank"><i class="fab fa-github"></i></a>
      <a href="https://twitter.com/Yanmoo_gou" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="https://linkedin.com/in/yanmo-huang-b4363a339" target="_blank"><i class="fab fa-linkedin"></i></a>
    </section>

    <section class="cta">
      <button @click="showMore">了解更多</button>
      <p v-if="isMoreInfoVisible">其实没有更多，但是我很爱按按钮，这个可以按来按去</p>
    </section>

    <footer class="footer">
      <p>&copy; 2025 狗老师. 版权所有.</p>
    </footer>
  </div>
</template>

<script>
import MyPet from '../components/MyPet.vue';
import HoverZoom from '../components/HoverZoom.vue';
import MessageBoard from '@/components/MessageBoard.vue';
import Emotion from '../components/Emotion.vue';

export default {
  name: 'App',
  components: {
    MyPet,
    Emotion,
    HoverZoom,
    MessageBoard
  },
  data() {
    return {
      isMoreInfoVisible: false,
      username: '',
      messageContent: '',
      messages: []  // 存储留言的数组
    }
  },
  methods: {
    showMore() {
      this.isMoreInfoVisible = !this.isMoreInfoVisible;
    },
    submitMessage() {
      const newMessage = {
        username: this.username,
        content: this.messageContent,
        date: new Date().toLocaleString()
      };
      this.messages.push(newMessage);
      this.username = '';
      this.messageContent = '';
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
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #ff6b6b, #f4f4f4);
  color: #333;
}

#app {
  text-align: center;
  padding: 30px;
  animation: fadeIn 2s ease-in forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.header {
  background-color: #4CAF50;
  color: white;
  padding: 25px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 36px;
}

.intro {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px;
  background-color: #fff;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-left,
.profile-center,
.profile-right {
  position: relative;
  width: 28%;
  margin: 10px;
  transition: transform 0.3s ease-in-out;
}

.profile-left:hover,
.profile-center:hover,
.profile-right:hover {
  transform: scale(1.05);
}

.profile-left img,
.profile-center img,
.profile-right img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 美化视频、照片和音乐文字 */
.profile-text {
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 10px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.profile-text:hover {
  transform: scale(1.1); /* 鼠标悬停时放大文字 */
}


/* Emotion Section */
.emotion {
  background: linear-gradient(135deg, #ff9a8b, #ff6a00);
  color: white;
  text-align: center;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
}

.emotion h2 {
  font-size: 36px;
  margin-bottom: 20px;
  animation: slideIn 2s ease-in;
}

.emotion-content p {
  font-size: 18px;
  margin-bottom: 20px;
}

.emotion-animation img {
  width: 150px;
  margin-top: 20px;
  animation: bounce 2s infinite;
}

/* Animation for bounce */
@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(-15px);
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.contact {
  background-color: #fff;
  margin-top: 40px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
}

.social-media i {
  font-size: 36px;
  color: #4CAF50;
  transition: color 0.3s ease;
}

.cta button {
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
