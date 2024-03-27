import { dialog } from 'electron'
export const selDir = async () => {
  const res = await dialog.showOpenDialog({
    properties: ['openDirectory', 'promptToCreate'],
    title: '选择文件架'
  })
  console.log(res)
  return res
}
