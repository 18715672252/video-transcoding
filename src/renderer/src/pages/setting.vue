<template>
  <main class="">
    <section>
      <h2>分辨率</h2>
      <el-select placeholder="分辨率">
        <el-option
          v-for="(item, index) in sizes"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <div class="flex gap-1 mt-2 items-center">
        <el-input v-model="newValSize" clearable />
        <el-button type="primary" @click="addVideoSize">添加</el-button>
      </div>
    </section>
    <section>
      <h2>帧数</h2>
      <el-select placeholder="帧率">
        <el-option
          v-for="(item, index) in frames"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <div class="flex gap-1 mt-2 items-center">
        <el-input v-model="newValFrame" clearable />
        <el-button type="success" @click="addVideoFrame">添加</el-button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import useCounterStore from '../store'
import useAddVideoSize from '../composables/addVideoSize'
const { frames, sizes } = useCounterStore()
const [newValSize, addVideoSize] = useAddVideoSize('size')
const [newValFrame, addVideoFrame] = useAddVideoSize('size')
</script>

<style scoped lang="scss">
section {
  @apply bg-white m-3 p-3 rounded-lg;
  h2 {
    @apply text-slate-700 text-sm mb-2 opacity-80;
  }
}
</style>
