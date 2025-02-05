<template>
  <div class="zoom-container">
    <div class="flip-container" @mouseover="zoomIn" @mouseleave="zoomOut">
      <div class="flipper" ref="flipper">
        <!-- 正面图片 -->
        <img class="profile-pic front" :src="src" :alt="alt" />
        <!-- 反面图片 -->
        <img class="profile-pic back" :src="backSrc" :alt="backAlt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoverZoom',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    backSrc: {
      type: String,
      required: true
    },
    backAlt: {
      type: String,
      required: true
    }
  },
  methods: {
    zoomIn() {
      const flipper = this.$refs.flipper;

      // 鼠标悬停时开始旋转到540度
      flipper.style.transition = "transform 2s ease-in-out";  // 旋转到540度的动画
      flipper.style.transform = "rotateY(540deg)";  // 旋转540度
    },
    zoomOut() {
      const flipper = this.$refs.flipper;

      // 鼠标移开时加速回到正面
      flipper.style.transition = "transform 1s ease-out";  // 加速回正面
      flipper.style.transform = "rotateY(0deg)";  // 恢复为正面
    }
  }
}
</script>

<style scoped>
.zoom-container {
  perspective: 1200px; /* 3D透视深度 */
}

.flip-container {
  width: 200px;
  height: 200px;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d; /* 允许子元素在3D空间中旋转 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.flipper {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d; /* 保持3D效果 */
  transform-origin: center; /* 保证旋转围绕图片的中心 */
  transform: rotateY(0deg); /* 初始状态为正面 */
  display: block;
}

.profile-pic {
  width: 100%;
  height: 100%;
  border-radius: 50%;  /* 圆形图片 */
  object-fit: cover;
  position: absolute;
  backface-visibility: hidden; /* 隐藏背面图片 */
}

/* 正面图片 */
.profile-pic.front {
  transform: rotateY(0deg); /* 正面图片初始时无需旋转 */
}

/* 反面图片 */
.profile-pic.back {
  transform: rotateY(180deg); /* 反面图片初始时旋转180度 */
}
</style>
