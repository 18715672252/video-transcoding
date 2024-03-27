import { ElectronAPI } from '@electron-toolkit/preload'
import { CompressOptions } from '../main/ffmpeg'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress: (option: CompressOptions) => void
      selDir: () => Promise<unknown>
    }
  }
}
