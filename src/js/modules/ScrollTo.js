import { Module } from './Module'

class ScrollTo extends Module {
  _scrollToHandler = this.handleScrollTo.bind(this)

  constructor(element, ctx) {
    super(element, ctx)

    this.$element = element
  }

  init() {
    this.$element.addEventListener('click', this._scrollToHandler)
  }

  destroy() {
    this.$element.removeEventListener('click', this._scrollToHandler)
  }

  handleScrollTo(e) {
    e.preventDefault()

    const targetId = e.target.getAttribute('href')
    const marginRoot = e.target.dataset.marginRoot
    const documentStyle = getComputedStyle(document.documentElement)
    const headerHeight = parseFloat(
      documentStyle.getPropertyValue('--header-height'),
    )
    const target = document.querySelector(targetId)
    const offsetTarget = marginRoot && target.closest(marginRoot)

    const top = offsetTarget
      ? offsetTarget.offsetTop - headerHeight
      : target.offsetTop - headerHeight

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

export default ScrollTo
