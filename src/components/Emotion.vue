<template>
  <div
    class="emotional-bin-container"
    ref="container"
    :style="{ left: containerPosition.x + 'px', top: containerPosition.y + 'px' }"
    @mousedown="startDrag"
    @mousemove="dragging"
    @mouseup="stopDrag"
    @touchstart="startDrag"
    @touchmove="dragging"
    @touchend="stopDrag"
  >
    <h2 class="title">情绪垃圾桶</h2>

    <!-- 用户选择或输入情绪 -->
    <div class="emotion-selection">
      <input
        v-model="newEmotion"
        type="text"
        placeholder="输入你的情绪..."
        @keyup.enter="addEmotion"
        class="emotion-input"
      />
      <button @click="addEmotion" class="add-button">投放情绪</button>
    </div>

    <!-- 显示当前垃圾桶中的情绪 -->
    <div v-if="emotions.length" class="emotion-bin">
      <h6 class="bin-title">试试多点几下</h6>
      <div
        class="emotion-cloud"
        :style="{ width: containerWidth + 'px', height: containerHeight + 'px' }"
      >
        <div
          v-for="(emotion, index) in emotions"
          :key="index"
          class="emotion-item"
          :class="{
            'fade-out': emotion.isFading,
            'hidden': emotion.clickCount >= 3,
            'bubble': emotion.visible
          }"
          :style="{
            left: emotion.x + 'px',
            top: emotion.y + 'px',
            fontSize: emotion.size + 'px',
            color: emotion.color,
            transform: 'scale(' + emotion.scale + ')'
          }"
          @click="handleClick(index)"
          @mouseover="hoverIn(index)"
          @mouseleave="hoverOut(index)"
        >
          {{ emotion.text }}
          <span v-if="emotion.clickCount < 3" class="click-hint">点！</span>
        </div>
      </div>
    </div>
    <div v-else class="empty-bin">
      <p>垃圾桶是空的，快把你的情绪投进去吧！<br>我是可以拖动的<br/></p>
    </div>

    <!-- 清空垃圾桶按钮（仅在有情绪时显示） -->
    <div v-if="emotions.length" class="clear-btn-container">
      <button @click="clearEmotions" class="clear-button">清空垃圾桶</button>
    </div>

    <!-- 显示祝福语 -->
    <div v-if="showBlessing" class="blessing-message">
      祝你一天都有好心情！
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmotionalGarbageBin',
  data() {
    return {
      newEmotion: '',
      emotions: [],
      containerPosition: { x: 100, y: 100 },  // 默认位置相对于父容器
      containerWidth: 0,
      containerHeight: 0,
      showBlessing: false,
      isDragging: false,
      dragStart: { x: 0, y: 0 },
    };
  },
  mounted() {
    this.containerWidth = this.$el.offsetWidth;
    this.containerHeight = this.$el.offsetHeight;
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.containerWidth = this.$el.offsetWidth;
      this.containerHeight = this.$el.offsetHeight;
    },
    startDrag(e) {
      e.preventDefault(); // 防止触摸和鼠标事件的默认行为
      this.isDragging = true;
      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
      this.dragStart.x = clientX - this.containerPosition.x;
      this.dragStart.y = clientY - this.containerPosition.y;
    },
    dragging(e) {
      if (this.isDragging) {
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        this.containerPosition.x = clientX - this.dragStart.x;
        this.containerPosition.y = clientY - this.dragStart.y;
      }
    },
    stopDrag() {
      this.isDragging = false;
    },
    addEmotion() {
      if (this.newEmotion.trim()) {
        const newEmotion = {
          text: this.newEmotion,
          size: Math.floor(Math.random() * 24) + 8, // 字体大小随机
          // 优化随机位置，确保不会超出容器范围
          x: Math.random() * (this.containerWidth - 100), // 减去气泡宽度
          y: Math.random() * (this.containerHeight - 40), // 减去气泡高度
          color: this.getRandomColor(),
          scale: 1,
          clickCount: 0,
          visible: true,
          isFading: false
        };
        this.emotions.push(newEmotion);
        this.newEmotion = '';
        this.showBlessing = false;
      }
    },
    getRandomColor() {
      return `hsl(${Math.random() * 360}, 70%, 50%)`;
    },
    handleClick(index) {
      const emotion = this.emotions[index];
      if (emotion.visible) {
        emotion.isFading = true;
        setTimeout(() => {
          emotion.isFading = false;
          emotion.clickCount += 1;

          if (emotion.clickCount >= 3) {
            emotion.visible = false;
          }

          if (this.emotions.every(emotion => emotion.clickCount >= 3)) {
            this.emotions = [];
            this.showBlessing = true;
            setTimeout(() => {
              this.resetState();
            }, 3000);
          }
        }, 1000);
      }
    },
    hoverIn(index) {
      this.emotions[index].scale = 1.5;
    },
    hoverOut(index) {
      this.emotions[index].scale = 1;
    },
    resetState() {
      this.emotions = [];
      this.showBlessing = false;
      this.newEmotion = '';
    },
    clearEmotions() {
      this.emotions = [];
      this.showBlessing = true;  // 清空垃圾桶后显示祝福语
      setTimeout(() => {
        this.resetState();
      }, 3000);  // 祝福语显示后，3秒钟重置垃圾桶
    }
  }
};
</script>

<style scoped>
/* 主容器 */
.emotional-bin-container {
  position: absolute;
  padding: 20px;
  background: #eaf9e6;
  border-radius: 12px;
  width: 350px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: grab;
}

.emotional-bin-container:active {
  cursor: grabbing;
}

.title {
  text-align: center;
  font-size: 26px; /* 标题字体大小调整 */
  color: #2e8b57;
  margin-bottom: 20px;
}

.bin-title{
  color: #2e8b57;
}

.emotion-selection {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.emotion-input {
  flex-grow: 1;
  padding: 12px;
  border: 2px solid #2e8b57;
  border-radius: 8px;
  font-size: 16px;
}

.add-button {
  padding: 10px 20px;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.emotion-cloud {
  position: relative;
  height: 80%;
  overflow: hidden;
}

.emotion-item {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 1;
  transition: transform 0.3s ease-in-out, opacity 0.6s ease-in-out, box-shadow 0.3s ease;
}

.emotion-item.fade-out {
  opacity: 0;
  transform: scale(0.8);
}

.emotion-item.hidden {
  display: none;
}

.emotion-item:hover {
  transform: scale(1.2);
}

.click-hint {
  display: block;
  font-size: 14px;
  color: #888;
  margin-top: 5px;
  text-align: center;
}

.blessing-message {
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  text-align: center;
  margin-top: 30px;
}

.empty-bin {
  text-align: center;
  font-size: 16px;
  color: #7f8c8d;
}

/* 清空垃圾桶按钮 */
.clear-btn-container {
  text-align: center;
  margin-top: 20px;
}

.clear-button {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .input-container {
    width: 90%;
  }

  input {
    font-size: 16px;
    padding: 10px 15px;
  }

  .blessing-message {
    font-size: 20px;
  }

  .title {
    font-size: 20px;
  }
}
</style>
