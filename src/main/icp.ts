import { IpcMainInvokeEvent, ipcMain } from 'electron'
import Ffmpeg, { CompressOptions } from './ffmpeg'
import { selDir } from './settingDir'
let FfmpegaStack: Array<Ffmpeg> = []
ipcMain.handle('compress', (_ev: IpcMainInvokeEvent, option: CompressOptions) => {
  const videoFfmpeg = new Ffmpeg(_ev, option)
  FfmpegaStack.push(videoFfmpeg)
  videoFfmpeg.run()
})

ipcMain.handle('selDir', async () => {
  return selDir()
})

ipcMain.handle('stop', async () => {
  try {
    FfmpegaStack.forEach((item) => {
      item.stop()
    })
    FfmpegaStack = []
    return { status: 200, message: '全部暂停' }
  } catch (error) {
    return error
  }
})
