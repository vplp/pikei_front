import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Module } from './Module'

class BenefitsSlider extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.UI = {}

    Object.assign(this.UI, {
      swiperContainer: element.querySelector('.swiper'),
      slides: element.querySelectorAll('.benefits-slider__slide'),
      swiperPagination: element.querySelector('.swiper-pagination'),
      progressBarCurrent: element.querySelector(
        '.swiper-progress-bar__current',
      ),
      progressBarTotal: element.querySelector('.swiper-progress-bar__total'),
      progressBarFill: element.querySelector('.swiper-progress-bar__fill'),
    })
  }

  init() {
    this.initSlider()
  }

  destroy() {
    this.slider.destroy()
  }

  initSlider() {
    this.slider = new Swiper(this.UI.swiperContainer, {
      init: false,
      modules: [Autoplay, EffectFade, Pagination, Navigation],
      autoplay: true,
      effect: 'fade',
      loop: true,
      pauseOnMouseEnter: true,
      pagination: {
        el: this.UI.swiperPagination,
        clickable: true,
        pauseOnMouseEnter: true,
        renderBullet: (index, className) => {
          const { title } = this.UI.slides[index].dataset

          return `<span class="${className}">${title}</span>`
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })

    this.slider.on('init', () => {
      this.UI.progressBarTotal.innerHTML = this.getFormattedIndex(
        this.slider.slides.length,
      )

      this.UI.paginationBullets = this.UI.swiperPagination.querySelectorAll(
        '.swiper-pagination-bullet',
      )

      this.updateProgress()
    })

    this.slider.on('slideChange', () => {
      this.updateProgress()
    })

    this.slider.init()
  }

  updateProgress() {
    this.curentIndex = this.slider.realIndex + 1
    this.UI.progressBarCurrent.innerHTML = this.getFormattedIndex(
      this.curentIndex,
    )
    this.UI.progressBarFill.style.width =
      (100 / this.slider.slides.length) *
        this.getFormattedIndex(this.curentIndex) +
      '%'
  }

  getFormattedIndex(index) {
    return index % 10 === 0 ? index : '0' + index
  }
}

export default BenefitsSlider
