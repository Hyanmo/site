<template>
    <div :class="{'dark-mode': isDarkMode}" class="video-play-container">
      <h2>视频播放</h2>
      <div class="stage">
        <!-- 视频播放器区域 -->
        <div v-if="videoUrl" class="video-wrapper">
          <video ref="videoPlayer" :src="videoUrl" controls autoplay></video>
        </div>
        <div v-else class="no-video">
          <p>请拖拽 MP4 文件到下方区域播放</p>
        </div>
      </div>
  
      <!-- 拖拽上传视频 -->
      <div class="upload-area" @drop.prevent="handleDrop" @dragover.prevent>
        <p>拖拽 MP4 视频文件到此区域</p>
      </div>
  
      <!-- 返回按钮 -->
      <button @click="goBack" class="back-button">返回个人主页</button>
  
      <!-- 工具栏小球 -->
      <div
        class="toolbar-ball"
        @mousedown="startDrag"
        @click="handleBallClick"
        :style="{ top: toolbarPosition.top + 'px', left: toolbarPosition.left + 'px' }"
      >
        <i class="fas fa-wrench"></i> <!-- 工具图标 -->
      </div>
  
      <!-- 工具栏 -->
      <div
        v-show="isToolbarOpen"
        class="toolbar"
        :style="{ top: toolbarPosition.top + 50 + 'px', left: toolbarPosition.left + 'px' }"
      >
        <div @click="toggleDarkMode" class="tool-item">
          <i class="fas fa-lightbulb"></i> 关灯
        </div>
        <div @click="triggerLikeEffect" class="tool-item">
          <i class="fas fa-thumbs-up"></i> 点赞
        </div>
      </div>
  
      <!-- 点赞动画 -->
      <div v-if="showLike" class="like-effect">
        <i :class="randomLikeIcon" class="like-icon"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VideoPlay',
    data() {
      return {
        videoUrl: null, // 存储上传视频的 URL
        isDarkMode: false, // 是否开启暗黑模式
        showLike: false, // 是否显示点赞效果
        isToolbarOpen: false, // 工具栏是否展开
        isDragging: false, // 是否正在拖拽工具栏小球
        toolbarPosition: { top: 150, left: 30 }, // 工具栏小球初始位置
        dragOffset: { x: 0, y: 0 }, // 拖拽偏移量
        likeIcons: ['fas fa-heart', 'fas fa-star', 'fas fa-smile', 'fas fa-fire'], // 可用的点赞图标
        randomLikeIcon: '', // 随机选择的点赞图标
        isBallClicking: false, // 用来判断小球是否正在点击
      };
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'Profile' });
      },
      handleDrop(event) {
        const files = event.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'video/mp4') {
          const file = files[0];
          this.videoUrl = URL.createObjectURL(file); // 创建视频的 URL 并播放
          this.$nextTick(() => {
            this.$refs.videoPlayer.play(); // 播放视频
          });
        } else {
          alert('请上传有效的 MP4 文件');
        }
      },
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
      },
      triggerLikeEffect() {
        // 随机选择一个点赞图标
        const randomIndex = Math.floor(Math.random() * this.likeIcons.length);
        this.randomLikeIcon = this.likeIcons[randomIndex];
  
        this.showLike = true;
        setTimeout(() => {
          this.showLike = false; // 点赞效果持续 3 秒
        }, 3000);
      },
      handleBallClick() {
        // 只有在没有拖拽的情况下才触发点击事件
        if (!this.isDragging) {
          this.isToolbarOpen = !this.isToolbarOpen;
        }
      },
  
      // 开始拖拽工具栏小球
      startDrag(event) {
        this.isDragging = true;
        this.isBallClicking = false; // 拖拽时不触发点击
        this.dragOffset.x = event.clientX - this.toolbarPosition.left;
        this.dragOffset.y = event.clientY - this.toolbarPosition.top;
        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.stopDrag);
        document.body.style.cursor = 'move'; // 改变光标样式为 "move"
      },
  
      // 拖拽工具栏小球
      onDrag(event) {
        if (this.isDragging) {
          this.toolbarPosition.top = event.clientY - this.dragOffset.y;
          this.toolbarPosition.left = event.clientX - this.dragOffset.x;
        }
      },
  
      // 停止拖拽工具栏小球
      stopDrag() {
        this.isDragging = false;
        this.isBallClicking = true; // 拖拽结束，允许点击事件
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
        document.body.style.cursor = 'default'; // 恢复光标样式
      },
    },
  };
  </script>
  
  <style scoped>
  .video-play-container {
    text-align: center;
    padding: 40px;
    background-color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    position: relative;
    transition: background-color 0.3s ease;
  }
  
  .video-play-container.dark-mode {
    background-color: #333;
    color: #fff;
  }
  
  h2 {
    font-size: 36px;
    color: #42b983;
    margin-bottom: 30px;
  }
  
  .stage {
    position: relative;
    width: 90%;
    max-width: 960px; /* 最大宽度限制 */
    height: 400px;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.7) 100%);
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .video-wrapper {
    width: 100%;
    height: 100%;
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 自适应显示，确保视频不被拉伸或裁切 */
    border-radius: 12px;
  }
  
  /* 横屏样式 */
  @media (orientation: landscape) {
    .stage {
      height: 60vh; /* 横屏时视频占据更少的高度 */
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
  
  /* 竖屏样式 */
  @media (orientation: portrait) {
    .stage {
      height: 60vh; /* 竖屏时视频占据一定的高度 */
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
  
  .no-video {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #42b983;
    font-size: 20px;
    font-weight: bold;
  }
  
  .upload-area {
    border: 2px dashed #36a759;
    background-color: #f0f0f0;
    padding: 40px;
    margin-top: 20px;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .upload-area:hover {
    background-color: #e0e0e0;
  }
  
  .back-button {
    padding: 12px 30px;
    background-color: #2e8b57;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 18px;
    margin-top: 30px;
    transition: transform 0.3s ease;
  }
  
  .back-button:hover {
    transform: scale(1.1); /* 悬浮时按钮放大 */
  }
  
  /* 工具栏小球 */
  .toolbar-ball {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #16a967;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .toolbar-ball i {
    color: white;
    font-size: 18px;
  }
  
  /* 工具栏 */
  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px 20px;
    border-radius: 20px;
    cursor: default;
  }
  
  .tool-item {
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }
  
  .tool-item:hover {
    background-color: #42b983;
  }
  
  /* 点赞效果 */
  .like-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    pointer-events: none;
    animation: like-animation 0.5s ease-out;
  }
  
  .like-icon {
    font-size: 50px;
    color: #ff4081;
    animation: like-pop 1s ease-in-out;
  }
  
  @keyframes like-pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes like-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  </style>
  