import { Module } from './Module'
import { APP } from '@js/app'
import Overlay from './Overlay'

class CatalogPanels extends Module {
  constructor(element, ctx) {
    super(element, ctx)
    this.UI = {}
    this.overlay = new Overlay()

    Object.assign(this.UI, {
      categoryTrigger: element.querySelector('.js-category-trigger'),
      filtersTrigger: element.querySelector('.js-filters-trigger'),
      categoryPanel: element.querySelector('.js-category-panel'),
      filtersPanel: element.querySelector('.js-filters-panel'),
    })

    this.isOpen = false
    this.currentPanel = null
  }

  init() {
    this.UI.categoryTrigger.addEventListener('click', () => {
      this.currentPanel = this.UI.categoryPanel
      this.toggle()
    })
    this.UI.filtersTrigger.addEventListener('click', () => {
      this.currentPanel = this.UI.filtersPanel
      this.toggle()
    })

    this.$element.addEventListener('click', (e) => {
      if (e.target.closest('.panel__close-btn')) {
        const panel = e.target.closest('.panel')

        if (panel) {
          this.currentPanel = panel
          this.toggle()
        }
      }
    })
  }
  destroy() {}

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.isOpen = true
    this.overlay.show()
    this.currentPanel.classList.add('_active')
    APP.plugins.overflow.hide()
  }

  close() {
    this.isOpen = false
    this.currentPanel.classList.remove('_active')
    this.overlay.hide()
    APP.plugins.overflow.show()
  }
}

export default CatalogPanels
