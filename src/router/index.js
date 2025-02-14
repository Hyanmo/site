import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/UserLogin.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import GameSudoku from '@/views/GameSudoku.vue';
import PhotoGallery from '@/views/PhotoGallery.vue';
import MusicPlay from '@/views/MusicPlay.vue';

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
    children: [
      {
        path: 'photo-gallery',  // 这里不需要以 `/profile` 开头
        name: 'PhotoGallery',
        component: PhotoGallery,
      },
      {
        path: 'music-play',  // 这里不需要以 `/profile` 开头
        name: 'MusicPlay',
        component: MusicPlay,
      },
      {
        path: 'sudoku-game1',  // 这里不需要以 `/profile` 开头
        name: 'Sudoku',
        component: GameSudoku,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
