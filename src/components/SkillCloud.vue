<template>
  <div class="skill-cloud">
    <div
      v-for="(skill, index) in skills"
      :key="index"
      class="skill-item"
      :style="{
        left: skill.x + 'px',
        top: skill.y + 'px',
        fontSize: skill.size + 'px',
        color: skill.color
      }">
      {{ skill.text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { text: 'Vue.js', size: 24, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(160, 70%, 50%)' },
        { text: 'JavaScript', size: 28, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(200, 70%, 50%)' },
        { text: 'HTML5', size: 22, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(280, 70%, 50%)' },
        { text: 'CSS3', size: 22, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(320, 70%, 50%)' },
        { text: 'Node.js', size: 20, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(40, 70%, 50%)' },
        { text: 'Git', size: 18, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(80, 70%, 50%)' },
        { text: 'Python', size: 26, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(120, 70%, 50%)' },
        { text: 'React', size: 24, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(240, 70%, 50%)' },
        { text: 'TypeScript', size: 20, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(360, 70%, 50%)' }
      ],
      containerWidth: 0,
      containerHeight: 300,
      animationId: null,
    };
  },
  mounted() {
    this.containerWidth = this.$el.offsetWidth;
    this.containerHeight = this.$el.offsetHeight; // 获取容器高度
    this.initPositions();
    this.startAnimation();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    // 初始化词语的随机位置和速度
    initPositions() {
      this.skills.forEach(skill => {
        skill.x = Math.random() * this.containerWidth;
        skill.y = Math.random() * this.containerHeight;
        skill.size = Math.random() * (28 - 18) + 18; // 动态字体大小
        skill.color = `hsl(${Math.random() * 360}, 70%, 50%)`; // 随机颜色
      });
    },

    // 窗口大小变化时，更新容器宽高
    handleResize() {
      this.containerWidth = this.$el.offsetWidth;
      this.containerHeight = this.$el.offsetHeight;
    },

    // 启动动画
    startAnimation() {
      const animate = () => {
        this.updatePositions();
        this.animationId = requestAnimationFrame(animate);
      };
      animate();
    },

    // 更新词云中每个词的位置
    updatePositions() {
      const speedFactor = 0.4;

      this.skills.forEach(skill => {
        skill.x += skill.speedX * speedFactor;
        skill.y += skill.speedY * speedFactor;

        // 边界碰撞检测，并反转速度，避免停滞
        if (skill.x <= 0 || skill.x >= this.containerWidth) {
          skill.speedX *= -1;
          skill.speedX += (Math.random() - 0.5) * 0.5; // 增加速度的随机变化
        }
        if (skill.y <= 0 || skill.y >= this.containerHeight) {
          skill.speedY *= -1;
          skill.speedY += (Math.random() - 0.5) * 0.5; // 增加速度的随机变化
        }

        // 限制词语的位置，使其始终在容器内
        skill.x = Math.max(0, Math.min(skill.x, this.containerWidth));
        skill.y = Math.max(0, Math.min(skill.y, this.containerHeight));
      });
    },
  },
};
</script>

<style scoped>
.skill-cloud {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.skill-item {
  position: absolute;
  transition: transform 0.3s ease-in-out;
}
</style>
