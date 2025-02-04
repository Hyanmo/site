<template>
    <img 
      class="profile-pic" 
      :src="src" 
      :alt="alt" 
      @mouseover="zoomIn" 
      @mouseleave="zoomOut"
    />
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
      }
    },
    methods: {
      zoomIn(event) {
        event.target.style.transform = 'scale(1.2)';
        event.target.style.transition = 'transform 0.3s ease';
      },
      zoomOut(event) {
        event.target.style.transform = 'scale(1)';
        event.target.style.transition = 'transform 0.3s ease';
      }
    }
  }
  </script>
  
<style scoped>
.profile-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;/* 放大效果 */
}

.profile-pic:hover {
    transform: scale(1.1);/* 鼠标悬停时放大 */
}
</style>
  
