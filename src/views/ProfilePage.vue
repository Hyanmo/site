<template>
  <div id="app">
    <MyPet />
    <header class="header">
      <h1>个人主页</h1>
      <p>你好，我是狗老师</p>
    </header>

    <section class="intro">
      <div class="profile-left">
        <a href="https://baidu.com" target="_blank" class="hover-container">
          <HoverZoom 
            :src="require('@/assets/2.jpg')" 
            :backSrc="require('@/assets/1.jpg')"
            alt="Profile Picture" 
            backAlt="back Picture"
          />
        </a>
      </div>

      <div class="profile-center">
        <a href="https://baidu.com" target="_blank" class="hover-container">
          <HoverZoom 
            :src="require('@/assets/3.jpg')" 
            :backSrc="require('@/assets/1.jpg')"
            alt="Profile Picture"
            backAlt="back Picture" 
          />
        </a>
      </div>

      <div class="profile-right">
        <a href="https://baidu.com" target="_blank" class="hover-container">
          <HoverZoom 
            :src="require('@/assets/4.jpg')" 
            :backSrc="require('@/assets/1.jpg')"
            alt="Profile Picture" 
            backAlt="back Picture"
          />
        </a>
      </div>
    </section>

    <section class="emotion">
      <p>如果心情不好就多点几下</p>
      <WordCloud />
    </section>

    <!-- 留言板 -->
    <section class="contact">
      <MessageBoard />  
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
import MyPet from '../components/MyPet.vue';
import WordCloud from '../components/WordCloud.vue';
import HoverZoom from '../components/HoverZoom.vue';
import MessageBoard from '@/components/MessageBoard.vue';

export default {
  name: 'App',
  components: {
    MyPet,
    WordCloud,  
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
      // 提交留言时，创建一个新的留言对象
      const newMessage = {
        username: this.username,
        content: this.messageContent,
        date: new Date().toLocaleString()  // 获取当前日期和时间
      };
      
      // 将新留言添加到 messages 数组
      this.messages.push(newMessage);

      // 清空输入框
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
  background: linear-gradient(135deg, #ff6b6b, #f4f4f4);  /* 渐变背景 */
  color: #333;
}

#app {
  text-align: center;
  padding: 30px;
  animation: fadeIn 2s ease-in forwards; /* 页面渐显 */
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
  opacity: 0;
  animation: fadeIn 2s ease-in forwards;
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

.profile-left, .profile-center, .profile-right {
  position: relative;
  width: 28%;
  margin: 10px;
  transition: transform 0.3s ease-in-out;
}

.profile-left:hover, .profile-center:hover, .profile-right:hover {
  transform: scale(1.05);
}

.profile-left img, .profile-center img, .profile-right img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.emotion {
  width: 100%;
  height: 500px; /* 你可以根据需求修改为100%来自适应 */
  background-color: #ffffff;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  padding: 40px;
  border: 6px solid #4CAF50;
  box-sizing: border-box; /* 确保 padding 被计算在内 */
  margin-top: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}



.contact {
  background-color: #fff;
  margin-top: 40px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.contact h2 {
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 20px;
}

.message-board {
  margin-bottom: 30px;
}

.message {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  text-align: left;
}

.message h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
}

.message p {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}

.message .time {
  font-size: 12px;
  color: #999;
  text-align: right;
  display: block;
}

.message-form h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.message-form input,
.message-form textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
}

.message-form textarea {
  min-height: 100px;
}

.message-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.message-form button:hover {
  background-color: #45a049;
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

.social-media i:hover {
  color: #333;
}

.cta {
  margin-top: 40px;
}

.cta button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cta button:hover {
  background-color: #45a049;
}

.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
