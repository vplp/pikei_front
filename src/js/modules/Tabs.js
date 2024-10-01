import cssAnimate from '@js/utils/cssAnimate'
import { Module } from './Module'

class Tabs extends Module {
  constructor(element, ctx) {
    super(element, ctx)
    this.$element = element
    this.tabButtons = element.querySelectorAll('.js-tab-button')
    this.tabs = element.querySelectorAll('.js-tab-item')
    this.currentButton = this.tabButtons[0]
    this.currentTab = this.tabs[0]
    this.swapButtons = this.$element.dataset.swapButtons
  }

  init() {
    cssAnimate(this.currentTab, true)

    this._setEventListener()
  }

  _setEventListener() {
    this.tabButtons.forEach((item, index) => {
      item.addEventListener('click', () => this._swapTabs(index))
    })
  }

  _swapTabs(index) {
    this._addDisabled()
    this.currentButton.classList.remove('_checked')
    this.currentButton = this.tabButtons[index]
    this.tabButtons[index].classList.add('_checked')

    this.swapButtons && this._swapButtons()

    const futureTab = this.tabs[index]
    this._selectTab(futureTab).then()
  }

  _swapButtons() {
    const [first] = this.$element.querySelectorAll('.js-tab-button')
    const prevElement = this.currentButton.previousElementSibling
    const hasDelimeter = prevElement.matches('span')

    first.before(this.currentButton)
    hasDelimeter && this.currentButton.after(prevElement)
  }

  _selectTab(futureTab) {
    return cssAnimate(this.currentTab, false).then(() => {
      this.currentTab = futureTab
      this._removeDisabled()

      return cssAnimate(this.currentTab, true)
    })
  }

  _addDisabled() {
    this.tabButtons.forEach((item) => {
      item.classList.add('_disabled')
    })
  }

  _removeDisabled() {
    this.tabButtons.forEach((item) => {
      item.classList.remove('_disabled')
    })
  }
}

export default Tabs
