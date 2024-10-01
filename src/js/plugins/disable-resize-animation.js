import { debounce } from 'lodash-es'

function disableResizeAnimationPlugin() {
  const TIMEOUT = 300

  const style = document.createElement('style')
  document.head.appendChild(style)
  style.appendChild(
    document.createTextNode(
      `.resize-animation-disabled * {animation: none !important;transition: none !important;}`,
    ),
  )

  window.addEventListener(
    'resize',
    debounce(
      () => document.body.classList.add('resize-animation-disabled'),
      TIMEOUT,
      { leading: true },
    ),
  )
  window.addEventListener(
    'resize',
    debounce(
      () => document.body.classList.remove('resize-animation-disabled'),
      TIMEOUT,
    ),
  )
}

export default disableResizeAnimationPlugin
