<template>
  <div class="music-play-container">
    <h2>狗老师觉得世界不能没有音乐</h2>
    <p>一些我常听的免费歌曲，因为vip的搞成URL或者mp3很麻烦，我非常懒</p>

    <!-- 播放列表 -->
    <div class="playlist">
      <h3>我的音乐分享</h3>
      <div v-for="(song, index) in songs" :key="index" class="song-item"
        :class="{ 'animate-fade': isItemVisible(index) }">
        <div class="song-info">
          <img :src="song.cover" alt="song cover" class="song-cover" />
          <div class="song-details">
            <h4>{{ song.title }}</h4>
            <p class="artist">{{ song.artist }}</p>
            <p class="description">{{ song.description }}</p>
            <button @click="playSong(song)" class="play-button">播放</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义音乐播放器 -->
    <div v-if="currentSong" class="custom-player">
      <h3>正在播放: {{ currentSong.title }}</h3>
      <div class="player-controls">
        <button @click="togglePlayPause" class="play-pause-btn">
          <i v-if="isPlaying" class="fas fa-pause"></i>
          <i v-else class="fas fa-play"></i>
        </button>
        <input type="range" v-model="currentTime" :max="duration" @input="seek" class="progress-bar" />
        <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
      <audio ref="audio" :src="currentSong.url" @loadedmetadata="onMetadataLoaded" @timeupdate="onTimeUpdate"
        @ended="onEnd" />
    </div>

    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">收起</button>
  </div>
</template>

<script>
export default {
  name: 'MusicPlay',
  data() {
    return {
      currentSong: null,  // 当前正在播放的歌曲
      isPlaying: false,   // 是否正在播放
      currentTime: 0,     // 当前播放时间
      duration: 0,        // 歌曲总时长
      songs: [
        {
          title: '两只老虎爱跳舞(DJ版)',
          url: '/music/mp3/两只老虎.mp3',
          cover: '/music/image/两只老虎.jpg', // 示例封面
          artist: '李艺存',
          description: '相信我，绝对是打游戏神曲，听了必赢！！！'
        },
        {
          title: '你不像她',
          url: '/music/mp3/你不像她.mp3',
          cover: '/music/image/你不像她.jpg',
          artist: '忘记谁翻唱了(原唱：南拳妈妈)',
          description: '喜欢这个是因为和姐姐去KTV唱歌，听到了觉得很好听，推荐。'
        },
        {
          title: '活动小丑',
          url: '/music/mp3/活动小丑 .mp3',
          cover: '/music/image/活动小丑.jpg',
          artist: '查理理',
          description: '初中的时候听的歌，就因为这个歌，觉得吉他好帅，结果后来更痴迷贝斯...因为贝斯更帅,那个时候非常中二，但是也不看动漫，就是爱存建模脸的动漫图'
        },
        {
          title: '棠梨煎雪',
          url: '/music/mp3/棠梨煎雪.mp3',
          cover: '/music/image/棠梨煎雪.jpg',
          artist: '双笙',
          description: '双笙不能没听过吧，我每次听她的歌都会感觉回到初中冬天的外婆家，因为那个时候我狂听！'
        },
        {
          title: 'Ditto-许杨玉琢',
          url: '/music/mp3/Ditto-许杨玉琢.mp3',
          cover: '/music/image/Ditto.jpg',
          artist: '许杨玉琢',
          description: '这个不用多说了，我愿称之为羊姐翻唱神曲，已经被我听到自动缓存了，没网也能听。'
        },
        {
          title: '等等',
          url: '/music/mp3/等等.mp3',
          cover: '/music/image/等等.jpg',
          artist: '许杨玉琢 袁一琦',
          description: '这是羊姐去年冬天生公我第二喜欢的歌，打球的时候老听。'
        },
        {
          title: "I Don't Care",
          url: "/music/mp3/I Don't Care.mp3",
          cover: "/music/image/I Don't Care.jpg",
          artist: 'Ed Sheeran & Justin Bieber',
          description: '黄老板和比伯的合作曲，我买的第一张电子专辑'
        }
      ],
      visibleIndex: -1 // 用于控制动画显示
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Profile' });
    },
    playSong(song) {
      if (this.currentSong !== song) {
        this.currentSong = song;
        this.isPlaying = true;
        this.currentTime = 0; // Reset time when a new song starts
        this.$nextTick(() => {
          this.$refs.audio.play(); // Ensure audio is played after DOM update
        });
      } else {
        this.togglePlayPause(); // Toggle between play and pause for the same song
      }
    },
    togglePlayPause() {
      if (this.isPlaying) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    onMetadataLoaded() {
      if (this.$refs.audio) {
        this.duration = this.$refs.audio.duration;
      }
    },
    onTimeUpdate() {
      if (this.$refs.audio) {
        this.currentTime = this.$refs.audio.currentTime;
      }
    },
    onEnd() {
      this.isPlaying = false;
    },
    seek() {
      if (this.$refs.audio) {
        this.$refs.audio.currentTime = this.currentTime;
      }
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    },
    isItemVisible(index) {
      return this.visibleIndex >= index;
    },
    startAnimation() {
      this.visibleIndex = 0;
      let index = 1;
      const interval = setInterval(() => {
        this.visibleIndex = index;
        index++;
        if (index >= this.songs.length) {
          clearInterval(interval);
        }
      }, 300);
    },
    handlePageUnload() {
      this.pauseAudio(); // Ensure audio is paused on page refresh or navigation
    },
    pauseAudio() {
      if (this.$refs.audio) {
        this.$refs.audio.pause(); // Pause the audio if it exists
        this.isPlaying = false;
      }
    }
  },
  mounted() {
    this.startAnimation(); // 页面加载时启动动画效果

    // Ensure audio is paused when the page is refreshed or navigated away
    window.addEventListener('beforeunload', this.handlePageUnload);
  },
  beforeUnmount() {
    // Clean up before the component is destroyed or page is unloaded
    window.removeEventListener('beforeunload', this.handlePageUnload);
    this.pauseAudio();
  }
};
</script>

<style scoped>
.music-play-container {
  font-family: 'Georgia', serif;
  text-align: center;
  padding: 40px;
  background-color: #f4f4f4;
  color: #333;
  animation: fadeIn 1s ease-out;
}

.playlist {
  margin-top: 40px;
  text-align: left;
  max-width: 900px;
  margin: 0 auto;
}

h2,
h3 {
  font-family: 'Garamond', serif;
  color: #2e2a47;
}

.song-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 左对齐 */
  padding: 25px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  /* 默认隐藏 */
  transform: translateY(20px);
  animation: fadeInUp 0.6s forwards;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: left;
}

.song-cover {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.song-details {
  max-width: 400px;
}

.song-details h4 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  color: #2e2a47;
}

.artist {
  font-size: 16px;
  color: #888;
}

.description {
  font-size: 15px;
  color: #666;
  margin-top: 10px;
}

.play-button {
  padding: 10px 20px;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.play-button:hover {
  background-color: #1f6d3d;
}

.custom-player {
  margin-top: 40px;
  padding: 25px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.play-pause-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 32px;
  padding: 12px;
  transition: transform 0.3s ease;
}

.play-pause-btn i {
  color: #2e8b57;
}

.play-pause-btn:hover {
  transform: scale(1.2);
}

.progress-bar {
  width: 50%;
}

.back-button {
  padding: 12px 24px;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 30px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-button:hover {
  background-color: #1f6d3d;
  transform: scale(1.05);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade {
  animation: fadeInUp 0.6s forwards;
}
</style>
