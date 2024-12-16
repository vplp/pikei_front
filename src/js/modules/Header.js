import { Module } from './Module'
import gsap from 'gsap'

class Header extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.lastScrollTop = 0
    this.delta = 15
    this.dropDownItems = document.querySelectorAll('[data-nav-dropdown-root]')
    this.dropDownChevrons = document.querySelectorAll(
      '[data-nav-dropdown-chevron]',
    )
  }

  init() {
    this.onResize()
    this.ctx.on('resize', this.onResize)
    document.addEventListener('scroll', this.onScroll)

    const mediaQuery = window.matchMedia('(min-width: 1023px)')
    mediaQuery.matches ? this.onDesktop() : this.onMobile()
    mediaQuery.addEventListener('change', (e) => {
      e.matches ? this.onDesktop() : this.onMobile()
    })
  }

  onDesktop() {
    this.checkHoverMenuItems()
  }

  onMobile() {
    this.checkClickMenuItems()
  }

  checkHoverMenuItems() {
    if (!this.dropDownItems || this.dropDownItems.length === 0) {
      return
    }

    this.dropDownItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        this.setVisible(item, true)
      })

      item.addEventListener('mouseleave', () => {
        this.setVisible(item, false)
      })
    })
  }

  checkClickMenuItems() {
    if (!this.dropDownChevrons || this.dropDownChevrons.length === 0) {
      return
    }

    // Обработчик для кликов по иконкам
    this.dropDownChevrons.forEach((item) => {
      const rootEl = item.closest('[data-nav-dropdown-root]')

      item.addEventListener('click', (e) => {
        e.stopPropagation() // Предотвращаем всплытие, чтобы не закрыть текущий rootEl

        const isVisible = rootEl.classList.contains('_visible')

        // Закрываем все остальные rootEl
        this.dropDownChevrons.forEach((otherItem) => {
          const otherRootEl = otherItem.closest('[data-nav-dropdown-root]')
          if (otherRootEl !== rootEl) {
            this.setVisible(otherRootEl, false)
          }
        })

        // Тогглим текущий rootEl
        this.setVisible(rootEl, !isVisible)
      })
    })

    // Обработчик для кликов вне элементов
    document.addEventListener('click', (e) => {
      this.dropDownChevrons.forEach((item) => {
        const rootEl = item.closest('[data-nav-dropdown-root]')
        if (
          rootEl.classList.contains('_visible') &&
          !rootEl.contains(e.target)
        ) {
          this.setVisible(rootEl, false)
        }
      })
    })
  }

  setVisible(element, isVisible) {
    if (isVisible) {
      element.classList.add('_visible')
    } else {
      element.classList.remove('_visible')
    }
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
