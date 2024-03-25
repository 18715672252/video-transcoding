import { defineStore } from 'pinia'
type sizesType = '1920*1080' | '1024*720'
type framesType = '60' | '30' | '24'
type obj = {
  sizes: Array<string>
  size: sizesType
  frames: Array
  frame: framesType
}
const useCounterStore = defineStore('config', {
  state: (): obj => ({
    sizes: ['1920*1080', '1024*720'],
    size: '1920*1080',
    frames: ['60', '30', '24'],
    frame: '60'
  }),
  actions: {
    addSize(payload: string) {
      this.sizes.push(payload)
    },
    addFrame(payload: string) {
      this.frames.push(payload)
    }
  }
})

export default useCounterStore
