import { IpcMainInvokeEvent } from 'electron'
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
  name: string
}
export default class Ffmpeg {
  ffmpeg: ffmpeg.FfmpegCommand
  constructor(
    private _ev: IpcMainInvokeEvent,
    private option: CompressOptions
  ) {
    this.ffmpeg = ffmpeg(this.option.file)
  }
  progressEvent = (progress) => {
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
