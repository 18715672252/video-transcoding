<template>
  <main class="mt-10">
    <section class="flex justify-center gap-2">
      <div class="button">
        <plus theme="outline" size="42" fill="#333" />
      </div>
      <div class="button">
        <one-third-rotation theme="outline" size="42" fill="#333"/>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Plus, OneThirdRotation } from '@icon-park/vue-next'
</script>

<style lang="scss" scoped>
.button {
  @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600;
}
</style>
