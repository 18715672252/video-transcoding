import { defineStore } from 'pinia'
import { VideoStatusType, sizesType, framesType, VideoStatus } from '../types'
export type fileType = {
  name: string
  path: string
  progress: number | string
  status: VideoStatusType
  id: string | number
}
type obj = {
  sizes: Array<string>
  size: sizesType
  frames: Array<string>
  frame: framesType
  files: Array<fileType>
  saveDir: string
}
const useCounterStore = defineStore('config', {
  state: (): obj => ({
    sizes: ['1920x1080', '1024x720'],
    size: '1920x1080',
    frames: ['60', '30', '24'],
    frame: '60',
    files: [],
    saveDir: 'C:/Users/Admin/Desktop/ag'
  }),
  actions: {
    addSize(payload: string) {
      this.sizes.push(payload)
    },
    addFrame(payload: string) {
      this.frames.push(payload)
    },
    delSize(index: number) {
      if (!this.sizes[index]) return
      this.sizes.splice(index, 1)
    },
    delFrame(index: number) {
      if (!this.frames[index]) return
      this.frames.splice(index, 1)
    },
    addFile(option: fileType) {
      console.log(option)
      this.files.push(option)
    },
    delVideo(option: Pick<fileType, 'name' | 'path'>) {
      const idx = this.files.findIndex((item: fileType) => {
        return item.name === option.name && item.path === option.path
      })
      this.files.splice(idx, 1)
    },
    setVideoProgress(progress: number | string, id: string | number) {
      const idx = this.files.findIndex((item) => item.id === id)
      console.log(progress, 'progress')
      if (+progress > 99.8) {
        progress = 100
      }
      this.files[idx].progress = progress
      if (progress === 100) {
        this.files[idx].status = VideoStatus.FINSH
      }
    },
    setVideoStatus(id: string | number) {
      const idx = this.files.findIndex((item) => item.id === id)
      this.files[idx].status = VideoStatus.ERROR
    },
    setSaveDir(payload: string) {
      this.saveDir = payload
    }
  }
})

export default useCounterStore
