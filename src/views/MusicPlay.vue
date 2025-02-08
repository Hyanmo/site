<template>
    <div class="music-play-container">
      <h2>音乐播放</h2>
  
      <!-- 播放列表 -->
      <div class="playlist">
        <h3>播放列表</h3>
        <ul>
          <li v-for="(song, index) in songs" :key="index" class="song-item">
            <span>{{ song.title }}</span>
            <button @click="playSong(song)" class="play-button">播放</button>
          </li>
        </ul>
      </div>
  
      <!-- 自定义音乐播放器 -->
      <div v-if="currentSong" class="custom-player">
        <h3>正在播放: {{ currentSong.title }}</h3>
        <div class="player-controls">
          <button @click="togglePlayPause" class="play-pause-btn">
            <!-- 使用 Font Awesome 图标 -->
            <i v-if="isPlaying" class="fas fa-pause"></i>
            <i v-else class="fas fa-play"></i>
          </button>
          <input type="range" v-model="currentTime" :max="duration" @input="seek" class="progress-bar" />
          <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        </div>
        <audio ref="audio" :src="currentSong.url" @loadedmetadata="onMetadataLoaded" @timeupdate="onTimeUpdate" @ended="onEnd" />
      </div>
  
      <!-- 拖拽上传音频 -->
      <div class="upload-container upload-area" @drop.prevent="handleDrop" @dragover.prevent>
        <p>拖拽 MP3 文件到此区域播放</p>
      </div>
  
      <!-- 返回按钮 -->
      <button @click="goBack" class="back-button">返回个人主页</button>
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
          { title: 'Never Gonna Give You Up - Rick Astley', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
          { title: 'Ocean Waves', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
          { title: 'Your Best Friend', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
        ]
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
        this.duration = this.$refs.audio.duration;
      },
      onTimeUpdate() {
        this.currentTime = this.$refs.audio.currentTime;
      },
      onEnd() {
        this.isPlaying = false;
      },
      seek() {
        this.$refs.audio.currentTime = this.currentTime;
      },
      formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      },
      handleDrop(event) {
        const files = event.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'audio/mpeg') {
          const file = files[0];
          const url = URL.createObjectURL(file);
          this.currentSong = { title: file.name, url };
          this.isPlaying = true;
          this.currentTime = 0; // Reset time when a new file is uploaded
          this.$nextTick(() => {
            this.$refs.audio.play(); // Play the uploaded song immediately
          });
        } else {
          alert('请上传有效的 MP3 文件');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .music-play-container {
    text-align: center;
    padding: 20px;
  }
  
  .playlist {
    margin-top: 30px;
    text-align: left;
  }
  
  .song-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .play-button {
    padding: 5px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .play-button:hover {
    background-color: #45a049;
  }
  
  .custom-player {
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f8f8f8;
  }
  
  .player-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .play-pause-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    padding: 10px;
  }
  
  .play-pause-btn i {
    color: #4caf50;
    font-size: 36px;
  }
  
  .progress-bar {
    width: 60%;
  }
  
  .upload-container {
    border: 2px dashed #4caf50;
    padding: 40px;
    margin-top: 30px;
    background-color: #f0f8f0;
    text-align: center;
    border-radius: 8px;
  }
  
  .upload-area {
    cursor: pointer;
  }
  
  .upload-container p {
    font-size: 18px;
    color: #555;
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
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .back-button:hover {
    background-color: #1f6d3d;
    transform: scale(1.05);
  }
  </style>
  