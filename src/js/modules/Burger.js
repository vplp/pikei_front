import Overlay from './Overlay'
import { APP } from '@js/app'

const OPENED_MENU_CLASS = '_menu-shown'

class Burger {
  constructor() {
    this.$header = document.querySelector('.header')
    this.$closeBtn = this.$header.querySelector('.js-burger-close')
    this.$openBtn = this.$header.querySelector('.js-burger-open')
    this.overlay = new Overlay(this)

    this.initListeners()
  }

  initListeners() {
    const buttons = [this.$closeBtn, this.$openBtn]

    buttons.forEach((btn) => btn.addEventListener('click', () => this.toggle()))

    // APP.on('resize', () => {
    //   this.overlay.isShown && this.overlay.hide()
    // })
  }

  hide() {
    this.$header.classList.remove(OPENED_MENU_CLASS)
    this.overlay.isShown && this.overlay.hide()
    APP.plugins.overflow.show()
  }

  show() {
    this.$header.classList.add(OPENED_MENU_CLASS)
    this.overlay.show()
    APP.plugins.overflow.hide()
  }

  toggle() {
    this.$header.classList.contains(OPENED_MENU_CLASS)
      ? this.hide()
      : this.show()
  }
}

export default Burger
