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
  
      <section class="skills-and-cards">
        <div class="skills">
          <p>Skills</p>
          <WordCloud />
        </div>
        
        <div class="about-me">
          <div class="card">
            <h3>教育背景</h3>
            <p>毕业于某大学，主修计算机科学。</p>
          </div>
          <div class="card">
            <h3>兴趣爱好</h3>
            <p>喜欢看电影、跑步和编程。</p>
          </div>
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
  import MyPet from '../components/MyPet.vue'
  import WordCloud from '../components/WordCloud.vue';
  import HoverZoom from '../components/HoverZoom.vue';
  
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
    animation: fadeIn 2s forwards; /* 页面渐显 */
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  .header {
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    opacity: 0;
    animation: fadeIn 2s forwards;
  }
  
  .intro {
    display: flex; 
    justify-content: space-between;     
    align-items: center;                
    padding: 30px;                     
    background-color: #fff;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-left, .profile-center, .profile-right {
    position: relative;
    width: 30%;
  }
  
  .skills-and-cards {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-top: 20px;
  }
  
  .skills {
    width: 50%;
    height: 400px;
    background-color: #ffffff;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    padding: 20px;
    border: 6px solid #4CAF50;
  }
  
  .about-me {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
  }
  
  .card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
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
  
  @media (max-width: 768px) {
    .intro {
      flex-direction: column;   
    }
    .profile-left, .profile-center, .profile-right {
      margin-bottom: 20px;
    }
  
    .skills-and-cards {
      flex-direction: column;
      align-items: center;
    }
  
    .skills, .about-me {
      width: 100%;
    }
  }
  </style>
  