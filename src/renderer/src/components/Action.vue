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
        <one-third-rotation theme="outline" size="42" fill="#333" />
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
const { frame, size } = storeToRefs(useCounterStore())
const { addFile, saveDir, files, setVideoProgress, setVideoStatus } = useCounterStore()
import { VideoStatus } from '../types'
const aa = () => {
  if (!files.length) {
    ElMessage.error('请添加视频文件')
    return
  }
  if (!saveDir) {
    ElMessage.error('请在设置页面设置保存路径')
    return
  }
  window.api.progressNotice(setVideoProgress)
  window.api.errorNotice(setVideoStatus)
  files.forEach((item) => {
    const videoName = `${new Date().toLocaleString().split(' ').join('').split('/').join('').split(':').join('')}-${size.value}-${frame.value}-${item.name}`
    window.api.compress({
      file: item.path,
      fps: +frame.value,
      size: size.value,
      dir: saveDir,
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
  addFile({ path, name, progress: 0, status: VideoStatus.COMPRESS, id })
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
