<template>
  <main class="flex justify-center gap-2">
    <el-button type="primary" size="small" @click="stop">停止转码</el-button>
    <el-button type="danger" size="small" @click="delVideo">全部删除</el-button>
  </main>
</template>

<script setup lang="ts">
import useCounterStore from '../store'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
const { delVideoNew } = useCounterStore()
const { transcodingPogress } = storeToRefs(useCounterStore())
const delVideo = () => {
  console.log(transcodingPogress.value)
  if (transcodingPogress.value) {
    ElMessage.warning('正在转码，无法删除')
    return
  }
  delVideoNew(true)
}
const stop = async () => {
  if (!transcodingPogress.value) {
    ElMessage.warning('暂无正在转码的视频')
    return
  }
  await window.api.stopNotice()
}
</script>

<style scoped>

</style>