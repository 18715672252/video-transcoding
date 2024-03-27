<template>
  <main class="mt-10">
    <section class="flex justify-center gap-2">
      <div class="button">
        <el-upload
          class="uploader"
          action="#"
          :show-file-list="false"
          :http-request="addFileCom"
          accept="video/*"
        >
          <plus theme="outline" size="42" fill="#333" />
        </el-upload>
      </div>
      <div class="button" @click="aa">
        <one-third-rotation theme="outline" size="42" fill="#333" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Plus, OneThirdRotation } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
import useCounterStore from '../store'
const { addFile, files, saveDir } = useCounterStore()
const aa = () => {
  files.forEach((item) => {
    window.api.compress({
      file: item.path,
      fps: 30,
      size: '1920x1080',
      dir: saveDir,
      name: item.name
    })
  })
}
const addFileCom = (options) => {
  const { path, name } = options.file
  const idx = files.findIndex((item) => item.name === name && item.path === path)
  if (idx > -1) {
    ElMessage.error('视频已经存在')
    return
  }
  const videoName =
    new Date().toLocaleString().split(' ').join('').split('/').join('').split(':').join('') + name
  console.log(videoName)
  addFile({ path, name: videoName, progress: 65 })
}
</script>

<style lang="scss" scoped>
.button {
  @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600;
  .uploader {
    @apply flex items-center;
  }
}
</style>
