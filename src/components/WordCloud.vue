<template>
  <div class="emotion-container">
    <div class="emotion-cloud">
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
        @mouseleave="hoverOut(index)">
        {{ emotion.text }}
      </div>
    </div>

    <!-- 显示祝福语 -->
    <div v-if="showBlessing" class="blessing-message">
      祝你一天都有好心情！
    </div>

    <!-- 情绪输入框 -->
    <div class="input-container">
      <input
        v-model="newEmotion"
        type="text"
        placeholder="输入今天的坏情绪..."
        @keyup.enter="addEmotion"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmotionCloud',
  data() {
    return {
      emotions: [
        { text: '糟糕的一天', size: 22, x: 50, y: 50, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(220, 70%, 60%)', scale: 1, clickCount: 0, visible: true },
        { text: '心情不好', size: 24, x: 100, y: 100, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(350, 80%, 60%)', scale: 1, clickCount: 0, visible: true },
        { text: '情绪低落', size: 26, x: 150, y: 150, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(60, 60%, 60%)', scale: 1, clickCount: 0, visible: true }
      ],
      newEmotion: '',
      containerWidth: 0,
      containerHeight: 0,
      animationId: null,
      emotionList: ['糟糕的一天', '心情不好', '情绪低落'],
      showBlessing: false,
    };
  },
  mounted() {
    this.containerWidth = this.$el.offsetWidth;
    this.containerHeight = this.$el.offsetHeight - 50;
    window.addEventListener('resize', this.handleResize);
    this.initPositions();
    this.startAnimation();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    initPositions() {
      this.emotions.forEach(emotion => {
        emotion.x = Math.random() * this.containerWidth;
        emotion.y = Math.random() * this.containerHeight;
      });
    },
    handleResize() {
      this.containerWidth = this.$el.offsetWidth;
      this.containerHeight = this.$el.offsetHeight - 50;
      this.initPositions();
    },
    addEmotion() {
      if (this.newEmotion.trim()) {
        const newEmotion = {
          text: this.newEmotion,
          size: Math.floor(Math.random() * 20) + 18,
          x: Math.random() * this.containerWidth,
          y: Math.random() * this.containerHeight,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: this.getRandomColor(),
          scale: 1,
          clickCount: 0,
          visible: true
        };
        this.emotions.push(newEmotion);
        this.emotionList.push(this.newEmotion);
        this.newEmotion = '';
        this.showBlessing = false;
      }
    },
    getRandomColor() {
      return `hsl(${Math.random() * 360}, 70%, 50%)`;
    },
    startAnimation() {
      const animate = () => {
        this.updatePositions();
        this.animationId = requestAnimationFrame(animate);
      };
      animate();
    },
    updatePositions() {
      const speedFactor = 0.4;
      this.emotions.forEach(emotion => {
        emotion.x += emotion.speedX * speedFactor;
        emotion.y += emotion.speedY * speedFactor;

        if (emotion.x <= 0 || emotion.x >= this.containerWidth - emotion.size) {
          emotion.speedX *= -1;
        }
        if (emotion.y <= 0 || emotion.y >= this.containerHeight - emotion.size) {
          emotion.speedY *= -1;
        }

        emotion.x = Math.max(0, Math.min(emotion.x, this.containerWidth - emotion.size));
        emotion.y = Math.max(0, Math.min(emotion.y, this.containerHeight - emotion.size));
      });
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
            this.showBlessing = true;
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
    getRandomEmotion() {
      return this.emotionList.length > 0 ? this.emotionList[Math.floor(Math.random() * this.emotionList.length)] : '没有情绪了';
    }
  }
};
</script>

<style scoped>

.emotion-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90%;
  justify-content: center;
  background: linear-gradient(145deg, #f3f4f7, #e5e7eb);
  font-family: 'Poppins', sans-serif;
}

.emotion-cloud {
  position: relative;
  width: 100%;
  height: 75%;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.emotion-item {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  user-select: none;
  padding: 8px 16px;
  border-radius: 50px;
  transition: transform 0.3s ease-in-out, opacity 0.6s ease-in-out, box-shadow 0.3s ease;
  opacity: 1;
  background: rgba(255, 255, 255, 0.7);
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
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
}

.input-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

input {
  padding: 12px 18px;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  width: 80%;
  max-width: 500px;
  box-sizing: border-box;
  outline: none;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

input:focus {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

input::placeholder {
  color: #aaa;
  font-style: italic;
}

.blessing-message {
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  text-align: center;
  margin-top: 30px;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.bubble {
  padding: 10px 20px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bubble:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

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
}
</style>
