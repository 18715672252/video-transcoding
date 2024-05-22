import { IpcMainInvokeEvent, BrowserWindow } from 'electron'
// import ffmpegPath from '@ffmpeg-installer/ffmpeg'
// import ffprobePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import { is } from '@electron-toolkit/utils'
import path from 'path'
if (is.dev) {
  ffmpeg.setFfmpegPath(path.resolve(__dirname, '../../resources/ffmpeg.exe'))
  ffmpeg.setFfprobePath(path.resolve(__dirname, '../../resources/ffprobe.exe'))
} else {
  ffmpeg.setFfmpegPath(process.resourcesPath.replace(/\\/g, '/') + '/app/resources/ffmpeg.exe')
  ffmpeg.setFfprobePath(process.resourcesPath.replace(/\\/g, '/') + '/app/resources/ffprobe.exe')
}
export type CompressOptions = {
  file: string
  fps: number
  size: string
  dir: string
  name: string
  id: string | number
}
export default class Ffmpeg {
  ffmpeg: ffmpeg.FfmpegCommand
  window: BrowserWindow
  id: string | number
  constructor(
    private _ev: IpcMainInvokeEvent,
    private option: CompressOptions
  ) {
    this.ffmpeg = ffmpeg(this.option.file)
    this.window = BrowserWindow.fromWebContents(this._ev.sender)!
    this.id = this.option.id
  }
  progressEvent = (progress) => {
    const obj = {
      progress: progress.percent,
      id: this.id
    }
    this.window.webContents.send('progress', obj)
  }
  error = (error) => {
    this.window.webContents.send('error', { ...error, id: this.id })
  }
  end = () => {
    this.window.webContents.send('end', this.id)
  }
  stop = () => {
    this.ffmpeg.kill('SIGKILL')
  }
  restart = () => {
    this.ffmpeg.kill('SIGCONT')
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
