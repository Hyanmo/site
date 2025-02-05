<template>
    <div>
      <img class="pet" id="pet" src="@/assets/image/Idle.gif" />
    </div>
  </template>
   
  <script>
  import { start } from "../pet.js";
  export default {
    data() {
      return {
      };
    },
    mounted() {
      start();
    },
    methods: {},
  };
  </script>
   
  <style>
  .pet {
    width: 50px;
    height: 65px;
    position: absolute;
    top: 20px;  /* 设置宠物初始位置 */
    left: 20px; /* 设置宠物初始位置 */
    background-size: cover;
    z-index: 9999;  /* 确保它在顶层 */
  }
  </style>