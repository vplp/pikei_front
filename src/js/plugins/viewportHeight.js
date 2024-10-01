import { isMobileSafari } from 'mobile-device-detect'

const viewportHeight = () => {
  if (!isMobileSafari) return

  const root = document.documentElement
  const el = document.createElement('div')

  el.classList.add('visually-hidden')
  el.style.zIndex = '-1000'
  el.style.userSelect = 'none'
  el.style.height = '100vh'

  document.body.appendChild(el)

  const storageData = sessionStorage.getItem('bar_size')
  const barSize = +storageData || el.offsetHeight - window.innerHeight

  if (!storageData) {
    sessionStorage.setItem('bar_size', String(barSize))
  }

  const update = () => {
    root.style.setProperty(
      '--viewport-height',
      el.offsetHeight - barSize + 'px',
    )
  }

  update()
  window.addEventListener('resize', update)
}

export default viewportHeight
