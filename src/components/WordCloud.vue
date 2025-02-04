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
        transform: skill.isHovered ? 'scale(1.5)' : 'scale(1)' // 放大效果
      }"
      @mouseenter="onMouseEnter(index)"  
      @mouseleave="onMouseLeave(index)" 
    >
      {{ skill.text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        { text: 'Vue.js', size: 24, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(160, 70%, 50%)', isHovered: false },
        { text: 'JavaScript', size: 28, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(200, 70%, 50%)', isHovered: false },
        { text: 'HTML5', size: 22, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(280, 70%, 50%)', isHovered: false },
        { text: 'CSS3', size: 22, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(320, 70%, 50%)', isHovered: false },
        { text: 'Node.js', size: 20, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(40, 70%, 50%)', isHovered: false },
        { text: 'Git', size: 18, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(80, 70%, 50%)', isHovered: false },
        { text: 'Python', size: 26, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(120, 70%, 50%)', isHovered: false },
        { text: 'React', size: 24, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(240, 70%, 50%)', isHovered: false },
        { text: 'TypeScript', size: 20, x: 0, y: 0, speedX: (Math.random() - 0.5) * 2, speedY: (Math.random() - 0.5) * 2, color: 'hsl(360, 70%, 50%)', isHovered: false }
      ],
      containerWidth: 0,
      containerHeight: 300,
      animationId: null
    };
  },
  mounted() {
    this.containerWidth = this.$el.offsetWidth;
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
        // 只有在没有悬停时才更新位置
        if (!skill.isHovered) {
          skill.x += skill.speedX * speedFactor;
          skill.y += skill.speedY * speedFactor;
        }

        // 边界检测
        if (skill.x <= 0 || skill.x >= this.containerWidth) {
          skill.speedX *= -1;
        }
        if (skill.y <= 0 || skill.y >= this.containerHeight) {
          skill.speedY *= -1;
        }

        skill.x = Math.max(0, Math.min(skill.x, this.containerWidth - 100));  // 限制 x 范围，避免超出
        skill.y = Math.max(0, Math.min(skill.y, this.containerHeight - 30));  // 限制 y 范围，避免超出
      });
    },
    onMouseEnter(index) {
      this.skills[index].isHovered = true;
    },
    onMouseLeave(index) {
      this.skills[index].isHovered = false;
    }
  }
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
  transition: transform 0.3s ease-in-out, font-size 0.3s ease-in-out;  /* 增加放大和缩小的过渡效果 */
}

.skill-item:hover {
  cursor: pointer;  /* 鼠标悬停时显示为指针 */
}
</style>
