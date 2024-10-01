import waitFontsLoaded from './waitFontsLoaded'
import viewportHeight from './viewportHeight'
import responsive from './responsive'
import overflow from './overflow'
import toasts from './toasts'
import server from './server'
import disableResizeAnimationPlugin from './disable-resize-animation'
// import lenisPlugin from './lenis'
// import barbaPlugin from './barba'
import htmxMultiSwap from './htmxMultiSwap'
import gsap from './gsap'

export const plugins = [
  // lenix,
  gsap,
  // barbaPlugin,
  htmxMultiSwap,
  toasts,
  server,
  responsive,
  overflow,
  waitFontsLoaded,
  viewportHeight,
  disableResizeAnimationPlugin,
]
