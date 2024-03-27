import { IpcMainInvokeEvent, ipcMain } from 'electron'
import Ffmpeg, { CompressOptions } from './ffmpeg'
import { selDir } from './settingDir'
ipcMain.handle('compress', (_ev: IpcMainInvokeEvent, option: CompressOptions) => {
  const videoFfmpeg = new Ffmpeg(_ev, option)
  videoFfmpeg.run()
})

ipcMain.handle('selDir', async () => {
  return selDir()
})
