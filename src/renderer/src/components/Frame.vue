<template>
  <main class="bg-white p-3 flex gap-2">
    <el-select v-model="size">
      <el-option v-for="(item, index) in sizes" :key="index" class="items-center" :value="item">
        {{ item }}
        <span class="text-slate-500 text-xs">分辨率</span>
      </el-option>
    </el-select>
    <el-select v-model="frame">
      <el-option v-for="(item, index) in frames" :key="index" class="items-center" :value="item">
        {{ item }}
        <span class="text-slate-500 text-xs">FPS</span>
      </el-option>
    </el-select>
  </main>
</template>

<script setup lang="ts">
import useCounterStore from '../store'
import { storeToRefs } from 'pinia'
const { frames, frame, sizes, size } = storeToRefs(useCounterStore())
</script>

<style scoped></style>
