<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import CopyRight from './components/CopyRight.vue'
</script>

<template>
  <main>
    <NavBar />
    <router-view></router-view>
    <Copy-right class="mt-2" />
  </main>
</template>
