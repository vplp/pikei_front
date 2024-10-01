/**
 * Expand / collapse element height
 * @param element { HTMLElement }
 * @param state { Boolean }
 * @param instant { Boolean }
 * @constructor
 */
export default function transitionExpand(element, state, instant = false) {
  if (!element) {
    console.error('Element is null')
  }

  element.style.transition = 'all 0.5s ease'
  element.style.overflow = 'hidden'

  const open = () => {
    const { width } = getComputedStyle(element)

    element.style.width = width
    element.style.position = `absolute`
    element.style.visibility = `hidden`
    element.style.height = `auto`

    const { height } = getComputedStyle(element)

    element.style.width = null
    element.style.position = null
    element.style.visibility = null
    element.style.height = 0

    getComputedStyle(element).height

    requestAnimationFrame(() => {
      element.style.height = height
    })
  }

  const close = () => {
    const { height } = getComputedStyle(element)
    element.style.height = height
    getComputedStyle(element).height
    requestAnimationFrame(() => {
      element.style.height = 0
    })
  }

  const afterOpen = () => {
    element.style.height = `auto`
    element.style.pointerEvents = ''
    element.style.overflow = 'visible'
  }

  if (state) {
    if (!instant) {
      open()
    } else {
      element.style.height = 'auto'
    }
  } else {
    if (!instant) {
      close()
    } else {
      element.style.height = '0px'
    }
  }

  if (element._onCssAnimateEnd) {
    element.removeEventListener('transitionend', element._onCssAnimateEnd)
  }

  element._onCssAnimateEnd = () => {
    if (state) {
      afterOpen()
    }
  }

  element.addEventListener('transitionend', element._onCssAnimateEnd, {
    once: true,
  })
}
