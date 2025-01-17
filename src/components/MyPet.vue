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
    background-size: cover;
  }
  </style>