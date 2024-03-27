import useCounterStore from '../store'
export default () => {
  const { files } = useCounterStore()
  console.log(files, 'files')
  const compress = window.api.compress({
    file: 'C:/Users/Admin/Desktop/ele-vite/8888.mp4',
    fps: 30,
    size: '1920x1080'
  })

  return compress
}
