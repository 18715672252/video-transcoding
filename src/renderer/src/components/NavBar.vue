<template>
  <main class="text-slate-600 bg-gray-50 text-xs flex justify-between px-3 py-2 drag">
    <section class="opacity-80">孙成龙</section>
    <section class="flex justify-between gap-2">
      <div class="nodrag cursor-pointer color" @click="minimize">最小化</div>
      <div class="nodrag cursor-pointer color" @click="close">关闭</div>
      <div>
        <router-link active-class="active-router" to="/" class="nodrag">转码</router-link>
      </div>
      <div>
        <router-link active-class="active-router" to="/setting" class="nodrag">配置</router-link>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
const minimize = () => {
  window.api.minimize()
}
const close = () => {
  window.api.close()
}
</script>
<style scoped lang="scss">
.color:hover {
  color: #409eff;
}
.active-router {
  color: #409eff;
}

</style>
