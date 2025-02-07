<template>
    <div class="message-board-container">
      <h2>留言板</h2>
  
      <div v-if="messages.length === 0" class="no-messages">
        <p>目前没有留言，快来留下第一条吧！</p>
      </div>
  
      <!-- 显示留言 -->
      <div v-for="(message, index) in visibleMessages" :key="index" class="message">
        <h4>留言人: {{ message.username }}</h4>
        <p>{{ message.content }}</p>
        <span class="time">{{ message.date }}</span>
      </div>
  
      <!-- 显示折叠按钮和隐藏留言的数量 -->
      <div v-if="messages.length > 2" class="collapse-info">
        <button @click="toggleCollapse">{{ collapsed ? '展开' : '收起' }} {{ collapsedMessageCount }} 条留言</button>
      </div>
  
      <!-- 留言提交表单 -->
      <div class="message-form">
        <h3>留下你的留言</h3>
        <form @submit.prevent="submitMessage">
          <input type="text" v-model="username" placeholder="你的名字" required />
          <textarea v-model="messageContent" placeholder="写下你的留言..." required></textarea>
          <button type="submit">提交留言</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MessageBoard',
    data() {
      return {
        username: '',
        messageContent: '',
        messages: [],  // 存储留言的数组
        collapsed: true,  // 是否折叠留言
      };
    },
    computed: {
      // 计算显示的留言
      visibleMessages() {
        if (this.collapsed) {
          return this.messages.slice(0, 2);  // 只显示前2条留言
        }
        return this.messages;  // 展开显示所有留言
      },
      // 计算折叠留言的数量
      collapsedMessageCount() {
        return this.messages.length - 2 > 0 ? this.messages.length - 2 : 0;
      },
    },
    methods: {
      // 获取留言
      async fetchMessages() {
        try {
          const response = await axios.get('http://localhost:3000/messages'); // 获取留言 API
          console.log(response.data.messages);  // 打印获取的留言
          this.messages = response.data.messages;  // 更新 messages 数组
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      },
      // 提交留言
      async submitMessage() {
        const newMessage = {
          username: this.username,
          content: this.messageContent,
          date: new Date().toLocaleString(),  // 获取当前日期和时间
        };
  
        try {
          await axios.post('http://localhost:3000/messages', newMessage); // 提交留言
          this.username = ''; // 清空用户名
          this.messageContent = ''; // 清空留言内容
          this.fetchMessages();  // 获取最新留言
        } catch (error) {
          console.error('Error submitting message:', error);
        }
      },
      // 切换折叠/展开状态
      toggleCollapse() {
        this.collapsed = !this.collapsed;
      },
    },
    mounted() {
      this.fetchMessages();  // 页面加载时获取留言
    }
  };
  </script>
  
  <style scoped>
  .message-board-container {
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .no-messages {
    text-align: center;
    color: #999;
  }
  
  .message {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .message h4 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .message p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .message .time {
    font-size: 12px;
    color: #999;
  }
  
  .message-form {
    margin-top: 20px;
  }
  
  .message-form input, .message-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .message-form button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .message-form button:hover {
    background-color: #45a049;
  }
  
  .collapse-info {
    text-align: center;
    margin-top: 10px;
  }
  
  .collapse-info button {
    background-color: #f0f0f0;
    color: #333;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .collapse-info button:hover {
    background-color: #ddd;
  }
  </style>
  