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
      <div class="button cursor-pointer" @click="aa">
        <one-third-rotation
          theme="outline"
          :class="{ 'animate-spin-yyy': transcodingPogress }"
          size="42"
          fill="#333"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Plus, OneThirdRotation } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
import useCounterStore from '../store'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
const { frame, size, transcodingPogress, saveDir } = storeToRefs(useCounterStore())
const { addFile, files, setVideoProgress, setVideoStatus } = useCounterStore()
import { VideoStatus } from '../types'
const aa = () => {
  if (!files.length) {
    ElMessage.error('请添加视频文件')
    return
  }
  if (!saveDir) {
    ElMessage.error('请在配置页面配置保存路径')
    return
  }
  if (transcodingPogress.value) {
    ElMessage.error('视频正在转码...')
    return
  }
  window.api.progressNotice(setVideoProgress)
  window.api.errorNotice(setVideoStatus)
  const filesSurplus = files.filter((item) => item.status === 'white' || item.status === '#ff6f91')
  console.log(filesSurplus)
  if (!filesSurplus.length) {
    ElMessage.error('视频已经全部转码完毕')
    return
  }
  filesSurplus.forEach((item) => {
    const videoName = `${new Date().toLocaleString().split(' ').join('').split('/').join('').split(':').join('')}-${size.value}-${frame.value}-.${item.name.split('.').slice(-1)}`
    window.api.compress({
      file: item.path,
      fps: +frame.value,
      size: size.value,
      dir: saveDir.value,
      name: videoName,
      id: item.id
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
  const id = uuidv4()
  addFile({ path, name, progress: 0, status: VideoStatus.READY, id })
}
</script>

<style lang="scss" scoped>
.button {
  @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600;
  .animate-spin-yyy {
    @apply animate-spin text-slate-300 cursor-wait;
  }
  .uploader {
    @apply flex items-center;
  }
}
</style>
