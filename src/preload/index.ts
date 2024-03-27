import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CompressOptions } from '../main/ffmpeg'
import { func } from '../renderer/src/types'
// Custom APIs for renderer
const api = {
  compress: (option: CompressOptions) => {
    ipcRenderer.invoke('compress', option)
  },
  selDir: async () => {
    return ipcRenderer.invoke('selDir')
  },
  progressNotice: (cb: func) => {
    ipcRenderer.on('progress', (_ev: IpcRendererEvent, data) => {
      cb(data.progress, data.id)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // electron原生API
    contextBridge.exposeInMainWorld('electron', electronAPI)
    // 添加自己的API
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
