import { APP } from '../app'
import { isMobileSafari } from 'mobile-device-detect'

class Overflow {
  constructor() {
    Object.assign(this, {
      UI: {
        html: document.documentElement,
        body: document.body,
      },
      savedScrollTop: 0,
      isHidden: false,
      hiddenForModules: [],
    })
  }

  hide(moduleName = '') {
    const moduleIndex = this.hiddenForModules.indexOf(moduleName)
    const hasModule = moduleIndex > -1

    if (hasModule) {
      return
    }

    this.hiddenForModules.push(moduleName)

    if (this.isHidden) {
      return
    }

    this.savedScrollTop = APP.scrollTop

    this.UI.html.classList.add('_overflow-hidden')

    Object.assign(
      this.UI.body.style,
      isMobileSafari
        ? {
            position: 'fixed',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }
        : {
            overflow: 'hidden',
          },
    )

    this.isHidden = true
  }

  show(moduleName = '') {
    if (!this.isHidden) {
      return
    }

    const moduleIndex = this.hiddenForModules.indexOf(moduleName)
    this.hiddenForModules.splice(moduleIndex, 1)

    const isShowOverflow = this.hiddenForModules.length === 0

    if (isShowOverflow) {
      this.UI.html.classList.remove('_overflow-hidden')
      Object.assign(this.UI.body.style, {
        position: '',
        overflow: '',
        width: '',
        height: '',
      })

      this.isHidden = false

      if (isMobileSafari) {
        setTimeout(() => {
          window.scrollTo(0, this.savedScrollTop)
          this.savedScrollTop = 0
        })
      }
    }
  }
}

const overflow = (ctx) => {
  APP.plugins.overflow = new Overflow()
}

export default overflow
