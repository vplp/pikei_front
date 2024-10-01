import Swiper from 'swiper'
import { Autoplay, Thumbs, Navigation } from 'swiper/modules'
import { Module } from './Module'

const TITLE_SELECTOR = '.preview-slider__src-title'
const DESCRIPTION_SELECTOR = '.preview-slider__src-description'

class PreviewSlider extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.UI = {}

    Object.assign(this.UI, {
      main: element.querySelector('.js-preview-slider-main'),
      thumbs: element.querySelector('.js-preview-slider-thumbs'),
      title: element.querySelector('.js-preview-slider-title'),
      description: element.querySelector('.js-preview-slider-description'),
    })
  }

  init() {
    this.thumbsSlider = new Swiper(this.UI.thumbs, {
      slidesPerView: 'auto',
      spaceBetween: 8,
      centerInsufficientSlides: true,
      breakpoints: {
        767: {
          spaceBetween: 16,
        },
      },
    })

    this.slider = new Swiper(this.UI.main, {
      modules: [Autoplay, Navigation, Thumbs],
      watchOverflow: true,
      autoplay: true,
      loop: true,
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: this.thumbsSlider,
      },
      on: {
        init: (swiper) => {
          if (swiper.slides.length < 2) {
            this.UI.thumbs.style.display = 'none'
          }
        },
      },
    })

    if (this.UI.title && this.UI.description) {
      this.slider.on('slideChange', ({ realIndex, slides }) => {
        if (!this.UI.title || !this.UI.description) return

        const currSlide = slides[realIndex]

        const title = currSlide.querySelector(TITLE_SELECTOR)
        const description = currSlide.querySelector(DESCRIPTION_SELECTOR)

        if (title) {
          this.UI.title.textContent = title.textContent
        }

        if (description) {
          this.UI.description.textContent = description.textContent
        }
      })
    }
  }

  destroy() {
    this.slider.destroy()
    this.thumbsSlider.destroy()
  }
}

export default PreviewSlider
