<template>
  <div class="container" 
       @mouseover="handleMouseOver" 
       @mouseleave="handleMouseLeave"
       @touchstart="handleTouchStart" 
       @touchmove="handleTouchMove" 
       @touchend="handleTouchEnd">
    
    <!-- 图片容器 -->
    <div class="image-container" ref="imageContainer">
      <div class="image-front">
        <img :src="src" :alt="alt" />
      </div>
      <div class="image-back">
        <img :src="backSrc" :alt="backAlt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    backSrc: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    backAlt: {
      type: String,
      required: true
    }
  },
  methods: {
    // PC端鼠标悬停时，放大并旋转图片
    handleMouseOver() {
      this.$refs.imageContainer.style.transform = 'scale(1.2) rotateY(540deg)';
    },
    // 鼠标离开时，恢复原状
    handleMouseLeave() {
      this.$refs.imageContainer.style.transform = 'scale(1) rotateY(0deg)';
    },
    // 移动端触摸开始时的处理
    handleTouchStart(event) {
      // 这里可以记录起始位置，进行更多的触摸滑动逻辑
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    },
    // 移动端触摸移动时的处理
    handleTouchMove(event) {
      // 通过触摸移动来控制旋转和缩放
      let touchMoveX = event.touches[0].clientX;
      let touchMoveY = event.touches[0].clientY;

      // 计算触摸的水平和垂直位移
      let deltaX = touchMoveX - this.touchStartX;
      let deltaY = touchMoveY - this.touchStartY;

      // 根据触摸的位移来旋转图片
      this.$refs.imageContainer.style.transform = `scale(1.2) rotateY(${deltaX}deg) rotateX(${deltaY}deg)`;

      // 防止页面滚动
      event.preventDefault();
    },
    // 移动端触摸结束时的处理
    handleTouchEnd() {
      // 恢复图片的原始状态
      this.$refs.imageContainer.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
    }
  }
}
</script>

<style scoped>
/* 设置父容器的3D视角 */
.container {
  perspective: 1000px; /* 给容器设置透视效果，影响3D效果的深度 */
  display: inline-block; /* 保证容器内的内容排列在一行 */
  width: 100%;
  text-align: center;
  padding: 10px;
}

/* 设置图片容器，保持3D效果 */
.image-container {
  width: 200px; /* 默认宽度 */
  height: 200px; /* 默认高度 */
  position: relative; /* 使用相对定位来设置图片容器的位置 */
  transform-style: preserve-3d; /* 保持3D变换的效果 */
  transition: transform 1s ease; /* 给transform添加过渡效果，使动画平滑 */
}

/* 正面和反面图片的共同样式 */
.image-front,
.image-back {
  position: absolute; /* 设置为绝对定位，使其重叠在一起 */
  top: 0; /* 从容器的顶部开始 */
  left: 0; /* 从容器的左边开始 */
  right: 0; /* 容器的右边 */
  bottom: 0; /* 容器的底边 */
  backface-visibility: hidden; /* 隐藏翻转后的反面内容 */
  border-radius: 50%; /* 保证图片是圆形 */
}

/* 设置图片的宽度和高度，使其填充容器 */
.image-front img,
.image-back img {
  width: 100%; /* 图片宽度为容器宽度 */
  height: 100%; /* 图片高度为容器高度 */
  object-fit: cover; /* 保证图片按比例裁切，保持其覆盖整个容器 */
  border-radius: 50%; /* 保证图片圆形 */
}

/* 反面图片的旋转，使其处于正面的背后 */
.image-back {
  transform: rotateY(180deg); /* 反面图片旋转180度，背对用户 */
}

/* 在小屏幕上，调整图片容器的大小 */
@media (max-width: 768px) {
  .image-container {
    width: 150px; /* 缩小容器的宽度 */
    height: 150px; /* 缩小容器的高度 */
  }
}

/* 在更小的屏幕上，进一步缩小容器 */
@media (max-width: 480px) {
  .image-container {
    width: 120px; /* 进一步缩小容器 */
    height: 120px; /* 进一步缩小容器 */
  }
}
</style>
