import Overlay from './Overlay'
import { Module } from './Module'
import { APP } from '@js/app'

const OPENED_CLASS = '_shown'

class Search extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.$searchToggle = document.querySelector('.js-search-toggle')
    this.$closeButton = this.$element.querySelector('.js-button-close')
    this.$background = this.$element.querySelector('.js-bg')

    this.initListeners()
  }

  initListeners() {
    this.$searchToggle.addEventListener('click', () => this.toggle())
    this.$closeButton.addEventListener('click', () => this.toggle())
    this.$background.addEventListener('click', () => this.toggle())
  }

  hide() {
    this.$element.classList.remove(OPENED_CLASS)
    this.$searchToggle.classList.remove('_active')
    APP.plugins.overflow.show()
  }

  show() {
    this.$element.classList.add(OPENED_CLASS)
    this.$searchToggle.classList.add('_active')
    APP.plugins.overflow.hide()
  }

  toggle() {
    this.$element.classList.contains(OPENED_CLASS) ? this.hide() : this.show()
  }
}

export default Search
