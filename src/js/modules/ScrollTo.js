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

    console.log('margin-root', e.target.dataset.marginRoot)

    var targetId = e.target.getAttribute('href')
    if (!targetId) {
      targetId = e.target.closest('.js-scroll-to-link').getAttribute('href')
    }

    const linkPage = e.target.getAttribute('data-open-page')
    if (linkPage) {
      localStorage.setItem('scrollTarget', targetId)
      localStorage.setItem('marginRoot', e.target.dataset.marginRoot)
      window.location.href = linkPage
      return
    }

    ScrollTo.scrollToTarget(targetId, e.target.dataset.marginRoot)
  }

  static scrollToTarget(targetId, marginRoot = null) {
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

  static autoScroll() {
    const scrollTarget = localStorage.getItem('scrollTarget')
    const marginRoot = localStorage.getItem('marginRoot')

    if (scrollTarget) {
      window.onload = function () {
        ScrollTo.scrollToTarget(scrollTarget, marginRoot)
        localStorage.removeItem('scrollTarget')
        localStorage.removeItem('marginRoot')
      }
    }
  }
}

export default ScrollTo
