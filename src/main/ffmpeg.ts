import { IpcMainInvokeEvent, ipcMain, BrowserWindow } from 'electron'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffprobePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobePath.path)
export type CompressOptions = {
  file: string
  fps: number
  size: string
  dir: string
  name: string,
  id: string | number
}
export default class Ffmpeg {
  ffmpeg: ffmpeg.FfmpegCommand
  window: BrowserWindow
  constructor(
    private _ev: IpcMainInvokeEvent,
    private option: CompressOptions,
    private id: string | number
  ) {
    this.ffmpeg = ffmpeg(this.option.file)
    this.window = BrowserWindow.fromWebContents(this._ev.sender)!
    this.id = option.id
  }
  progressEvent = (progress) => {
    const obj = {
      progress: progress.percent,
      id: this.id
    }
    this.window.webContents.send('progress', obj)
    console.log(progress + '%%%%%')
  }
  error = (error) => {
    console.log('An error occurred: ' + error.message)
  }
  end = () => {
    console.log('Processing finished !')
  }
  run() {
    this.ffmpeg
      .fps(this.option.fps)
      .size(this.option.size)
      .videoCodec('libx264')
      .on('error', this.error)
      .on('progress', this.progressEvent)
      .on('end', this.end)
      .save(path.resolve(this.option.dir, `./${this.option.name}`))
  }
}
