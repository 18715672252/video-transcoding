<template>
  <main class="text-slate-600 bg-gray-50 text-xs flex justify-between px-3 py-2 drag">
    <section class="opacity-80">孙成龙</section>
    <section class="flex justify-between gap-2">
      <div class="nodrag cursor-pointer">换肤</div>
      <div>
        <router-link to="/" class="nodrag">转码</router-link>
      </div>
      <div>
        <router-link to="/setting" class="nodrag">配置</router-link>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts"></script>
<style scoped></style>
