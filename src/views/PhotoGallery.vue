<template>
    <div class="photo-gallery-container">
      <h2>相册</h2>
  
      <!-- Photo Grid -->
      <div class="photo-grid">
        <div v-for="(photo, index) in photos" :key="index" class="photo-item">
          <img
            :src="photo.src"
            :alt="photo.alt"
            @click="openModal(photo.src)"
            class="photo-image"
          />
        </div>
      </div>
  
      <!-- Modal for Viewing Larger Image -->
      <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content">
          <img :src="modalImage" class="modal-image" />
        </div>
      </div>
  
      <!-- Back Button -->
      <button @click="goBack" class="back-button">返回个人主页</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PhotoGallery',
    data() {
      return {
        photos: [
          { src: require('@/assets/1.jpg'), alt: 'Photo 1' },
          { src: require('@/assets/2.jpg'), alt: 'Photo 2' },
          // Add more photos as needed
        ],
        showModal: false,
        modalImage: ''
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
      }
    }
  };
  </script>
  
  <style scoped>
  .photo-gallery-container {
    text-align: center;
    padding: 20px;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }
  
  .photo-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .photo-item:hover .photo-image {
    transform: scale(1.1);
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
  }
  
  .modal-content {
    position: relative;
  }
  
  .modal-image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
  
  .back-button {
    padding: 10px 20px;
    background-color: #2e8b57;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  
  .back-button:hover {
    background-color: #1c6b3f;
  }
  </style>
  