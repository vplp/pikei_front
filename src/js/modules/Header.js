import { Module } from './Module'
import gsap from 'gsap'

class Header extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.lastScrollTop = 0
    this.delta = 15
  }

  init() {
    this.onResize()
    this.ctx.on('resize', this.onResize)
    document.addEventListener('scroll', this.onScroll)
  }

  destroy() {
    document.removeEventListener('scroll', this.onScroll)
  }

  onResize = () => {
    const root = document.documentElement
    this.headerHeight = this.$element.offsetHeight
    this.footerHeight = document.querySelector('footer').offsetHeight

    root.style.setProperty('--header-height', `${this.headerHeight}px`)
  }

  onScroll = () => {
    const { scrollTop } = document.documentElement
    const { lastScrollTop, delta } = this

    if (Math.abs(lastScrollTop - scrollTop) <= delta) return

    const up = lastScrollTop > scrollTop

    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.offsetHeight - this.footerHeight
    ) {
      document.documentElement.classList.add('footer-in-view')
    } else {
      document.documentElement.classList.remove('footer-in-view')
    }

    if (up) {
      document.documentElement.classList.remove('header-hidden')
      document.documentElement.classList.add('scroll-up')

      gsap.to(this.$element, {
        y: 0,
      })

      this.lastScrollTop = scrollTop

      return
    } else {
      document.documentElement.classList.remove('scroll-up')
    }

    if (scrollTop > delta) {
      document.documentElement.classList.add('header-hidden')

      gsap.set(this.$element, { willChange: 'transform' })
      gsap.to(this.$element, {
        y: '-100%',
      })
    } else {
      document.documentElement.classList.remove('header-hidden')

      gsap.to(this.$element, {
        y: 0,
      })
    }

    this.lastScrollTop = scrollTop
  }
}

export default Header
