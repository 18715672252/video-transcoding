<template>
  <main class="overflow-y-auto h-80">
    <video-item v-for="item in files" :key="item" v-bind="item" />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import VideoItem from './VideoItem.vue'
import useCounterStore from '../store'
const { files } = storeToRefs(useCounterStore())
</script>
