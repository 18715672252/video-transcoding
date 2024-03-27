<template>
  <section class="video" :style="`--process: ${progress}%; --status:${status}`">
    <div class="title z-10">
      {{ name }}
    </div>
    <div class="icon" @click="delVideoCom">
      <close-one theme="outline" size="12" fill="#333"></close-one>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CloseOne } from '@icon-park/vue-next'
import { defineProps } from 'vue'
import useCounterStore from '../store'
const { name, path, progress, status } = defineProps<{
  name: string
  path: string
  progress: number
  status: string
}>()
const { delVideo } = useCounterStore()
const delVideoCom = () => {
  delVideo({ name, path })
}
</script>

<style scoped lang="scss">
.video {
  @apply bg-white px-4 py-[8px] rounded-lg mb-2 mx-3 text-xs text-slate-600 flex justify-between items-center relative;
  &::before {
    content: '';
    @apply absolute top-0 bottom-0 left-0 right-0 z-0 overflow-hidden;
    width: var(--process);
    background-color: var(--status);
  }
  .title {
    @apply truncate;
  }
  .icon {
    @apply text-teal-500 opacity-50 hover:scale-125 duration-300 hover:text-yellow-500 hover:opacity-50 cursor-pointer;
  }
}
</style>
