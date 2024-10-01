import Flickity from 'flickity'
import 'flickity-fade'
// import 'flickity-as-nav-for';

export default class Slider {
  static _defaultFlickityOptions = {
    imagesLoaded: true,
    prevNextButtons: false,
    pageDots: false,
    cellAlign: 'left',
  }

  static _defaultUI = {
    prevButton: null,
    nextButton: null,
    selectedIndex: null,
    sliderLength: null,
  }

  startX = 0

  /**
   * Слайдер
   * @param element - элемент слайдера
   * @param flickityOptions - Опции Flickity // https://flickity.metafizzy.co/options.html
   * @param UI - элементы для контролов
   */
  constructor(element = null, flickityOptions = {}, UI = Slider._defaultUI) {
    if (!element) {
      return
    }

    this._element = element
    this._flickityOptions = flickityOptions
    this._UI = UI
    this.flickity = null

    this._handleStart = this._handleStart.bind(this)
    this._handleMove = this._handleMove.bind(this)
    this._onPrevBtn = this._onPrevBtn.bind(this)
    this._onNextBtn = this._onNextBtn.bind(this)

    /**
     * Фикс вертикального скролла на мобильном Safari при свайпе
     */
    this._element.addEventListener('touchstart', this._handleStart)
    this._element.addEventListener('touchmove', this._handleMove)

    this.init(this._flickityOptions, this._UI)
  }

  init(updatedFlickityOptions = {}, updatedUI = Slider._defaultUI) {
    if (this.flickity !== null) {
      this._flickityRemove()
    }

    this._flickityOptions = updatedFlickityOptions
    this._UI = updatedUI
    this.flickity = new Flickity(this._element, {
      ...Slider._defaultFlickityOptions,
      ...this._flickityOptions,
    })

    this._UIBinding()
    this._onChange()
  }

  destroy() {
    this._element.removeEventListener('touchstart', this._handleStart)
    this._element.removeEventListener('touchmove', this._handleMove)

    this._flickityRemove()
    this._UIUnbinding()
  }

  _flickityRemove() {
    this.flickity.destroy()
    this.flickity = null
  }

  _UIBinding() {
    this.flickity.on('select', () => {
      this._onChange()
    })

    this._UI.prevButton?.addEventListener('click', this._onPrevBtn)
    this._UI.nextButton?.addEventListener('click', this._onNextBtn)
  }

  _UIUnbinding() {
    this._UI.prevButton?.removeEventListener('click', this._onPrevBtn)
    this._UI.nextButton?.removeEventListener('click', this._onNextBtn)
    this._UI = Slider._defaultUI
  }

  // Events
  _onPrevBtn() {
    this.flickity.player.clear()
    this.flickity.previous()
    this.flickity.player.tick()
  }

  _onNextBtn() {
    this.flickity.player.clear()
    this.flickity.next()
    this.flickity.player.tick()
  }

  _onChange() {
    if (!this.flickity.slides) return
    const slides = this.flickity.slides.length
    if (this._UI.nextButton && this._UI.prevButton) {
      this._UI.nextButton.disabled = this.flickity.selectedIndex === slides - 1
      this._UI.prevButton.disabled = this.flickity.selectedIndex === 0
    }
    if (this._UI.selectedIndex && this._UI.sliderLength) {
      this._UI.selectedIndex.textContent = this.flickity.selectedIndex + 1
      this._UI.sliderLength.textContent = slides
    }
  }

  _handleStart(e) {
    this.startX = e.touches[0].clientX
  }

  _handleMove(e) {
    if (Math.abs(e.touches[0].clientX - this.startX) > 5 && e.cancelable) {
      e.preventDefault()
    }
  }
}
