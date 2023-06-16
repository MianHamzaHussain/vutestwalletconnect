<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <ul>
    <li>
      <router-link to="/">Home Page</router-link>
    </li>
    <li>
      <router-link to="/about">About Page</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
img {
  margin: 0 auto;
  display: block;
}

a {
  color: #6cb6ff;
}

a:visited {
  color: #316dca
}

ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 0;
}
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
