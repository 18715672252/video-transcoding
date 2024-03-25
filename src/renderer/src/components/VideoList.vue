<template>
  <main class="overflow-y-auto h-80">
    <section v-for="item in videos" :key="item" class="video">
      {{ item }}
      <div class="icon">
        <close-one theme="outline" size="12" fill="#333"></close-one>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { CloseOne } from '@icon-park/vue-next'
import { ref } from 'vue'

const videos = ref([1, 2, 3, 4])
</script>

<style scoped lang="scss">
.video {
  @apply bg-white px-3 py-1 rounded-lg mb-2 mx-3 text-xs text-slate-600 flex justify-between items-center;
  .icon {
    @apply text-teal-500 opacity-50 hover:scale-125 duration-300 hover:text-yellow-500 hover:opacity-50 cursor-pointer;
  }
}
</style>
