import Swiper from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'
import { Module } from './Module'

class RelatedProductsSlider extends Module {
  constructor(element, ctx) {
    super(element, ctx)
  }

  init() {
    this.slider = new Swiper(this.$element.querySelector('.swiper'), {
      modules: [Autoplay, Navigation],
      watchOverflow: true,
      slidesPerView: 2.1,
      spaceBetween: 8,
      navigation: {
        nextEl: this.$element.querySelector('.swiper-button-next'),
        prevEl: this.$element.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1023: {
          slidesPerView: 4,
        },
      },
    })
  }

  destroy() {
    this.slider.destroy()
  }
}

export default RelatedProductsSlider
