<template>
  <main class="">
    <section>
      <h2>分辨率{{ size }}</h2>
      <el-select v-model="size" placeholder="分辨率">
        <el-option v-for="(item, index) in sizes" :key="index" :label="item" :value="item">
          <div class="flex justify-between items-center">
            {{ item }}
            <div class="delIcon" @click="() => delSize(index)">
              <close-one theme="outline" size="12" fill="#333" />
            </div>
          </div>
        </el-option>
      </el-select>
      <div class="flex gap-1 mt-2 items-center">
        <el-input v-model="newValSize" clearable />
        <el-button type="primary" @click="addVideoSize">添加</el-button>
      </div>
    </section>
    <section>
      <h2>帧数</h2>
      <el-select v-model="frame" placeholder="帧率">
        <el-option v-for="(item, index) in frames" :key="index" :label="item" :value="item">
          <div class="flex justify-between items-center">
            {{ item }}
            <div class="delIcon" @click="() => delFrame(index)">
              <close-one theme="outline" size="12" fill="#333" />
            </div>
          </div>
        </el-option>
      </el-select>
      <div class="flex gap-1 mt-2 items-center">
        <el-input v-model="newValFrame" clearable />
        <el-button type="success" @click="addVideoFrame">添加</el-button>
      </div>
    </section>
    <section>
      <h2>选择转码视频存放的文件夹</h2>
      <div class="flex gap-1 mt-2 items-center">
        <el-input :value="saveDir" disabled />
        <el-button type="success" @click="selDir">选择</el-button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import useCounterStore from '../store'
import useAddVideoSize from '../composables/addVideoSize'
import { CloseOne } from '@icon-park/vue-next'
import { storeToRefs } from 'pinia'
const { frames, sizes, size, saveDir, frame } = storeToRefs(useCounterStore())
const { setSaveDir } = useCounterStore()
const [newValSize, addVideoSize, delSize] = useAddVideoSize('size')
const [newValFrame, addVideoFrame, delFrame] = useAddVideoSize('frame')
const selDir = async () => {
  const res = await window.api.selDir()
  setSaveDir(res.filePaths[0])
}
</script>

<style scoped lang="scss">
.delIcon {
  @apply text-slate-300 hover:text-red-500 hover:scale-125 cursor-pointer duration-300;
}
section {
  @apply bg-white m-3 p-3 rounded-lg;
  h2 {
    @apply text-slate-700 text-sm mb-2 opacity-80;
  }
}
</style>
