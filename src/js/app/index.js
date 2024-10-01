import Emittery from 'emittery'
import { plugins } from '../plugins'
import { modules } from '../modules'
import isClass from '../utils/isClass'
import { uniqueId, debounce } from 'lodash-es'

class App extends Emittery {
  hasError = false
  isLoaded = false
  _isReady = false
  _isShown = false
  activeModules = {}
  plugins = {}

  constructor() {
    super()

    document.addEventListener(
      'DOMContentLoaded',
      () => {
        this.init()
      },
      { passive: true, once: true },
    )

    this.onObserverResizeHandler = debounce(() => {
      this.emit('resize:debounce')
    }, 500)
  }

  async init() {
    this.resizeObserver = new ResizeObserver(() => {
      this.onObserverResizeHandler()
      this.emit('resize')
    })
    this.resizeObserver.observe(document.documentElement)

    this.isLoaded = true
    this.emit('loaded')

    await this.initPlugins()
    await this.initModules()

    this.isReady = true
  }

  async refresh() {
    this.destroyModules()
    this.isReady = false
    this.isShown = false

    await this.initModules()

    this.isReady = true
    this.isShown = true
  }

  destroyModules(condition = (activeModule) => true) {
    Object.keys(this.activeModules).forEach((key, index) => {
      const module = this.activeModules[key]

      if (!condition(module)) return

      module.instance.destroy()
      delete this.activeModules[key]
    })
  }

  initPlugins() {
    return new Promise((resolve) => {
      plugins.forEach(async (plugin, index) => {
        await plugin(this)

        if (index === plugin.length - 1) resolve({})
      })
    })
  }

  async initModules(condition = (element, module) => true) {
    const inits = []

    Object.keys(modules).forEach((selector) => {
      const module = modules[selector]
      const documentHasEl = !!document.querySelector(selector)
      const selectorIsId = selector[0] === '#'

      if (!documentHasEl) return

      document.querySelectorAll(selector).forEach((element) => {
        let id

        if (!condition(element, module)) return

        if (!isClass(module)) {
          inits.push(
            module().then(({ default: res }) => {
              const inst = new res(element, this)
              const name = selector
              id = selectorIsId ? name : uniqueId(name + '_')

              this.activeModules[id] = {
                selector,
                id,
                instance: inst,
              }

              element.setAttribute('data-module-id', id)
              return inst.init()
            }),
          )
        } else {
          const inst = new module(element, this)
          const name = selector
          id = selectorIsId ? name : uniqueId(name + '_')

          this.activeModules[id] = {
            selector,
            id,
            instance: inst,
          }

          element.setAttribute('data-module-id', id)
          inits.push(inst.init())
        }
      })
    })

    await Promise.all(inits)
  }

  // @ts-ignore
  get isReady() {
    return this._isReady
  }
  // @ts-ignore
  set isReady(val) {
    const prev = this._isReady
    this._isReady = val

    if (val && prev !== val) {
      this.emit('ready')
    }
  }

  // @ts-ignore
  get isShown() {
    return this._isShown
  }
  // @ts-ignore
  set isShown(val) {
    const prev = this._isShown
    this._isShown = val

    if (val && prev !== val) {
      this.emit('shown')
    }
  }
}

export const APP = new App()
