import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import { Module } from './Module'

class TextContentSlider extends Module {
  constructor(element, ctx) {
    super(element, ctx)
  }

  init() {
    this.slider = new Swiper(this.$element.querySelector('.swiper'), {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      grabCursor: true,
      autoplay: true,
      spaceBetween: 16,
      pagination: {
        el: this.$element.querySelector('.swiper-pagination'),
        clickable: true,
        pauseOnMouseEnter: true,
      },
    })
  }

  destroy() {
    this.slider.destroy()
  }
}

export default TextContentSlider
