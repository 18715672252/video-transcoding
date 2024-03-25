import useCounterStore from '../store'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export default (type: 'size' | 'frame') => {
  const newVal = ref('')
  const { addSize, addFrame } = useCounterStore()
  const addVideoSize = async () => {
    await addSize(newVal.value)
    newVal.value = ''
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  }
  const addVideoFrame = async () => {
    await addFrame(newVal.value)
    newVal.value = ''
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  }
  if (type === 'size') {
    return [newVal, addVideoSize]
  } else {
    return [newVal, addVideoFrame]
  }
}
