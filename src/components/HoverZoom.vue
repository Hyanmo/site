<template>
  <!-- 容器，监听鼠标悬停和离开事件 -->
  <div class="container" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <!-- 包裹图片的容器，使用ref引用来操作DOM -->
    <div class="image-container" ref="imageContainer">
      <!-- 正面图片 -->
      <div class="image-front">
        <!-- 绑定传入的正面图片路径和alt描述 -->
        <img :src="src" :alt="alt" />
      </div>
      <!-- 反面图片 -->
      <div class="image-back">
        <!-- 绑定传入的反面图片路径和alt描述 -->
        <img :src="backSrc" :alt="backAlt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件接收的props，分别是正面图片、反面图片、正面图片alt、反面图片alt
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
    // 鼠标悬停时，放大并旋转图片
    handleMouseOver() {
      this.$refs.imageContainer.style.transform = 'scale(1.2) rotateY(540deg)'; // 放大并旋转
    },
    // 鼠标离开时，恢复原状
    handleMouseLeave() {
      this.$refs.imageContainer.style.transform = 'scale(1) rotateY(0deg)'; // 恢复原始大小并恢复旋转
    }
  }
}
</script>

<style scoped>
/* 设置父容器的3D视角 */
.container {
  perspective: 1000px; /* 给容器设置透视效果，影响3D效果的深度 */
  display: inline-block; /* 保证容器内的内容排列在一行 */
}

/* 设置图片容器，保持3D效果 */
.image-container {
  width: 200px; /* 设置图片容器的宽度 */
  height: 200px; /* 设置图片容器的高度 */
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

/* a 标签样式，确保其是块级元素并去掉链接的下划线 */
a {
  display: block;
  text-decoration: none;
}
</style>
