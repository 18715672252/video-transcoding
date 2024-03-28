import { ElectronAPI } from '@electron-toolkit/preload'
import { CompressOptions } from '../main/ffmpeg'
import { func, funcError } from '../renderer/src/types'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress: (option: CompressOptions) => void
      selDir: () => Promise<unknown>
      progressNotice: (arg: func) => void
      errorNotice: (arg: funcError) => void
      stopNotice: () => Promise<unknown>
    }
  }
}
