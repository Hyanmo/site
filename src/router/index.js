import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/UserLogin.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import VideoPlay from '@/views/VideoPlay.vue';
import PhotoGallery from '@/views/PhotoGallery.vue';
import MusicPlay from '@/views/MusicPlay.vue';

// 路由配置
const routes = [
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    beforeEnter: (to, from, next) => {
      // 如果没有登录，跳转到登录页面
      if (!localStorage.getItem('isLoggedIn')) {
        next({ name: 'UserLogin' });
      } else {
        next(); // 继续访问个人主页
      }
    },
  },
  {
    path: '/video-play',
    name: 'VideoPlay',
    component: VideoPlay,
  },
  {
    path: '/photo-gallery',
    name: 'PhotoGallery',
    component: PhotoGallery,
  },
  {
    path: '/music-play',
    name: 'MusicPlay',
    component: MusicPlay,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
