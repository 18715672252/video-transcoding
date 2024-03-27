export enum VideoStatus {
  READY = 'white', // 准备
  COMPRESS = '#f9f871', // 正在转码
  ERROR = '#ff6f91', // 转码错误
  FINSH = '#4ffbdf' // 转码成功完成
}
export type sizesType = '1920x1080' | '1024x720'

export type framesType = '60' | '30' | '24'

export type VideoStatusType = 'white' | '#f9f871' | '#ff6f91' | '#4ffbdf'

export type func = (progress: number | string, id: string | number) => void

// const bgColor = computed(() => ({
//   [VideoStatus.COMPRESS]: '#f9f871',
//   [VideoStatus.ERROR]: '#ff6f91',
//   [VideoStatus.FINSH]: '#4ffbdf'
// }))
