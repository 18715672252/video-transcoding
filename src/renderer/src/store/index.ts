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
  // transcodingPogress: boolean
}
const useCounterStore = defineStore('config', {
  state: (): obj => ({
    sizes: ['1920x1080', '1024x720'],
    size: '1920x1080',
    frames: ['60', '30', '24'],
    frame: '60',
    files: [],
    saveDir: 'C:/Users/Admin/Desktop/ag',
    // transcodingPogress: false
  }),
  getters: {
    transcodingPogress: (state: obj) => {
      let flag = false
      state.files.forEach((item: fileType) => {
        flag = flag || item.status === '#f9f871'
      })
      return flag
    }
  },
  actions: {
    addSize(payload: string) {
      this.sizes.push(payload)
    },
    addFrame(payload: string) {
      this.frames.push(payload)
    },
    delSize(index: unknown) {
      if (!this.sizes[index as number]) return
      this.sizes.splice(index as number, 1)
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
      if (+progress > 99.8) {
        progress = 100
      }
      this.files[idx].progress = progress
      this.files[idx].status = VideoStatus.COMPRESS
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
    },
    delVideoNew(isDelAll: boolean, id?: string | number) {
      // 删除视频
      if (isDelAll) {
        // this.files = [] // z直接赋值无法删除,后续要看看为什么
        while (this.files.length) {
          this.files.splice(0, 1)
        }
      }
      if (!isDelAll && id) {
        const idx = this.files.findIndex((item) => item.id === id)
        this.files.splice(idx, 1)
      }
    }
  }
})

export default useCounterStore
