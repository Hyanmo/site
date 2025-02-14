<template>
  <div class="photo-blog-container">
    <h2>相册日志分享</h2>

    <!-- Blog Post for each Photo -->
    <div class="blog-posts">
      <div v-for="(photo, index) in photos" :key="index" class="blog-post">
        <div class="blog-header">
          <h3 class="blog-title">{{ photo.title }}</h3>
          <span class="blog-date">{{ photo.date }}</span>
        </div>
        <div class="blog-content">
          <div class="blog-image-container">
            <img
              :src="photo.src"
              :alt="photo.alt"
              @click="openModal(photo.src)"
              class="blog-image"
            />
          </div>
          <p class="blog-description">{{ photo.description }}</p>
        </div>
      </div>
    </div>

    <!-- Modal for Viewing Larger Image -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content">
        <img :src="modalImage" class="modal-image" />
      </div>
    </div>

    <!-- Back Button -->
    <button @click="goBack" class="back-button">收起</button>
  </div>
</template>

<script>
export default {
  name: 'PhotoBlog',
  data() {
    return {
      photos: [
        {
          src: '/photo/小pa之ootd.jpg',
          alt: 'Photo 1',
          title: '全是小pas系列产品',
          date: '2024年10月6日',
          description: '穿着小pas棉袄，小pas裤子出门玩',
        },
        {
          src: '/photo/爱墙.jpg',
          alt: 'Photo 2',
          title: '爱墙',
          date: '2024年9月8日',
          description: '去爱墙了，但是人太多了，但是拍到了我爱你，所以我爱你',
        },
        {
          src: '/photo/像素画.jpg',
          alt: 'Photo 3',
          title: '法国的收集爱好者游戏',
          date: '2024年9月8日',
          description: '巴黎有非常多这种像素画，有个软件可以扫，我现在已经扫了13个了，全球排名183k～',
        },
        // Add more photos as needed
      ],
      showModal: false,
      modalImage: '',
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Profile' });
    },
    openModal(imageSrc) {
      this.modalImage = imageSrc;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.photo-blog-container {
  text-align: center;
  padding: 20px;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: bold;
}

.blog-posts {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.blog-post {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px; /* 统一宽度 */
  min-height: 400px; /* 统一最小高度 */
  display: flex;
  flex-direction: column;
}

.blog-post:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.blog-date {
  font-size: 0.85rem;
  color: #888;
}

.blog-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.blog-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.blog-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.blog-image:hover {
  transform: scale(1.05);
}

.blog-description {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
  margin-top: 10px;
  flex-grow: 1;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeInModal 0.5s ease;
}

.modal-content {
  position: relative;
  max-width: 50%;  /* 设定最大宽度为窗口的90% */
  max-height: 50%; /* 设定最大高度为窗口的90% */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  width: 100%;
  height: auto;
  object-fit: contain; /* 保证图片等比缩放 */
  max-width: 80%; /* 防止图片超出视口 */
  max-height: 80%; /* 防止图片超出视口 */
  animation: zoomIn 0.5s ease;
}

.back-button {
  padding: 8px 16px;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #1c6b3f;
}

@keyframes fadeInModal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes zoomIn {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
