import Swiper from 'swiper'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Module } from './Module'
import gsap from 'gsap'
import { isMobile } from 'mobile-device-detect'

class HeroSlider extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.UI = {}

    Object.assign(this.UI, {
      swiperContainer: element.querySelector('.swiper'),
      swiperPagination: element.querySelector('.swiper-pagination'),
    })

    this.cursor = null
    this.cursorShown = false
    this.isNext = true
  }

  init() {
    this.slider = new Swiper(this.UI.swiperContainer, {
      modules: [Autoplay, EffectFade, Pagination],
      effect: 'fade',
      autoplay: true,
      loop: true,
      pagination: {
        el: this.UI.swiperPagination,
        clickable: true,
      },
      breakpoints: {
        0: {
          allowTouchMove: true,
        },
        1023: {
          allowTouchMove: false,
        },
      },
    })

    !isMobile && this.addCursor()
    !isMobile && this.$element.addEventListener('mouseenter', this.onMouseEnter)
  }

  onMouseMove = (e) => {
    const { top, left } = this.$element.getBoundingClientRect()
    this.isNext = left + this.$element.offsetWidth / 2 < e.x

    gsap.to(this.cursor, { scale: this.isNext ? 1 : -1 })

    if (
      e.target.closest('.btn') ||
      e.target.closest('.swiper-pagination-bullet')
    ) {
      this.toggleCursor(false)

      gsap.to(this.cursor, {
        x: e.x - left - this.cursor.offsetWidth / 2,
        y: e.y - top - this.cursor.offsetHeight / 2,
        duration: 0.15,
      })

      return
    }

    gsap.to(this.cursor, {
      x: e.x - left - this.cursor.offsetWidth / 2,
      y: e.y - top - this.cursor.offsetHeight / 2,
      duration: 0.15,
    })

    this.toggleCursor(true)
  }

  onMouseDown = () => {
    gsap.to(this.cursor, {
      scale: this.isNext ? 0.8 : -0.8,
      duration: 0.2,
      onComplete: () => {
        gsap.to(this.cursor, { scale: this.isNext ? 1 : -1, duration: 0.2 })
      },
    })
  }

  onMouseEnter = () => {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mousedown', this.onMouseDown)
    this.$element.addEventListener('click', this.onClick)
    this.$element.addEventListener('mouseleave', this.onMouseLeave)
  }

  onMouseLeave = () => {
    this.toggleCursor(false)

    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mousedown', this.onMouseDown)
    this.$element.removeEventListener('mouseleave', this.onMouseLeave)
    this.$element.removeEventListener('click', this.onClick)
  }

  onClick = () => {
    this.isNext ? this.slider.slideNext() : this.slider.slidePrev()
  }

  addCursor() {
    if (this.cursor) return

    this.cursor = document.createElement('div')
    this.cursor.classList.add('cursor')

    this.$element.style.position = 'relative'
    this.$element.append(this.cursor)
  }

  toggleCursor(isShown = false) {
    this.$element.style.cursor = isShown ? 'none' : 'auto'
    gsap.to(this.cursor, { autoAlpha: isShown ? 1 : 0 })

    this.cursorShown = isShown
  }

  destroy() {
    this.slider.destroy()
  }
}

export default HeroSlider
