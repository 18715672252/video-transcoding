import { defineStore } from 'pinia'
type sizesType = '1920x1080' | '1024x720'
type framesType = '60' | '30' | '24'
export type fileType = {
  name: string
  path: string
  progress: number
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
    delVideo(option: fileType) {
      const idx = this.files.findIndex((item: fileType) => {
        return item.name === option.name && item.path === option.path
      })
      this.files.splice(idx, 1)
    },
    setSaveDir(payload: string) {
      console.log(payload, 'payload')
      this.saveDir = payload
    }
  }
})

export default useCounterStore
