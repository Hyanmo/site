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
        color: skill.color,
        transform: 'scale(' + skill.scale + ')'
      }"
      @mouseover="hoverIn(index)"
      @mouseleave="hoverOut(index)">
      {{ skill.text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { text: 'Vue.js', size: 24, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(160, 70%, 50%)', scale: 1 },
        { text: 'JavaScript', size: 28, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(200, 70%, 50%)', scale: 1 },
        // 你可以继续添加其他技能
      ],
      containerWidth: 0,
      containerHeight: 0,
      animationId: null
    };
  },
  mounted() {
    this.containerWidth = this.$el.offsetWidth;
    this.containerHeight = this.$el.offsetHeight;
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
    initPositions() {
      this.skills.forEach(skill => {
        skill.x = Math.random() * this.containerWidth;
        skill.y = Math.random() * this.containerHeight;
      });
    },
    handleResize() {
      this.containerWidth = this.$el.offsetWidth;
      this.containerHeight = this.$el.offsetHeight;
      this.initPositions();
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
      this.skills.forEach(skill => {
        skill.x += skill.speedX * speedFactor;
        skill.y += skill.speedY * speedFactor;

        // 防止词云元素超出容器范围
        if (skill.x <= 0 || skill.x >= this.containerWidth - skill.size) {
          skill.speedX *= -1;
          skill.speedX += (Math.random() - 0.5) * 0.5; // 随机改变速度
        }
        if (skill.y <= 0 || skill.y >= this.containerHeight - skill.size) {
          skill.speedY *= -1;
          skill.speedY += (Math.random() - 0.5) * 0.5; // 随机改变速度
        }

        // 限制技能位置在容器内部
        skill.x = Math.max(0, Math.min(skill.x, this.containerWidth - skill.size));
        skill.y = Math.max(0, Math.min(skill.y, this.containerHeight - skill.size));
      });
    },
    hoverIn(index) {
      this.skills[index].scale = 1.5;  // 放大
    },
    hoverOut(index) {
      this.skills[index].scale = 1;    // 恢复
    }
  }
};
</script>

<style scoped>
.skill-cloud {
  position: relative;
  width: 100%;
  height: 80%;
  overflow: hidden; /* 确保词云不会超出容器 */
}

.skill-item {
  position: absolute;
  transition: transform 0.3s ease-in-out;
  font-family: 'Pacifico', cursive; /* 设置可爱字体 */
  cursor: pointer; /* 鼠标变成手型 */
}

.skill-item:hover {
  transform: scale(1.5); /* 鼠标悬停时放大 */
}
</style>
