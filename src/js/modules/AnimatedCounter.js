import gsap from 'gsap'
import { Module } from './Module'

class AnimatedCounter extends Module {
  _regExp = /(-\d+|\d+)(,\d+)*(\.\d+)*/g
  /**
   * Добавляет HTML-элементу метод, анимирующий счётчик
   * @param element {HTMLElement}
   */
  constructor(element, ctx) {
    super(element, ctx)
  }

  init() {
    this.counter = this.$element

    this.endNum = this.getNum(this.counter.innerHTML)
    this.startNum = this.counter.dataset.start
      ? this.getNum(this.counter.dataset.start)
      : Math.floor(this.endNum * 0.5)

    const beforeStartStr = this.counter.innerHTML.match(this._regExp)?.join('')
    const startStr = this.counter.dataset.start
      ? this.getStr(this.counter.dataset.start)
      : this.getStr(Math.floor(this.endNum * 0.5))

    this.counter.innerHTML = this.counter.innerHTML.replace(
      beforeStartStr,
      startStr,
    )

    this.dec = this.getDecimalPlaces(this.endNum)
    this.value = null

    this.$element.animationAppend = () => this.animate()
  }

  /**
   * Обновляет HTML содержимое счётчика
   * @param isInteger {Boolean} false - оставить дробную часть, true - округлить
   */
  update(isInteger) {
    const currentStr = this.getStr(this.counter.innerHTML)
    const str = isInteger
      ? this.getStr(Math.floor(this.value))
      : this.getStr(this.value.toFixed(this.dec))

    this.counter.innerHTML = this.counter.innerHTML.replace(currentStr, str)
  }

  animate() {
    let frame = 0

    this.tl?.kill()
    this.tl = gsap.timeline()

    this.tl.fromTo(
      this,
      { value: this.startNum },
      {
        value: Math.floor(this.endNum),
        ease: this.dec ? 'sine' : 'power2.out',
        duration: this.dec ? 1 : 2.5,
        onUpdate: () => {
          if (++frame % 2 || this.value > this.endNum * 0.8) {
            this.update(true)
          }
        },
        onComplete: () => {
          !this.dec &&
            this.nextElement &&
            gsap.set(this.nextElement, { clearProps: 'all' })
        },
      },
    )

    if (this.dec) {
      this.tl.fromTo(
        this,
        { value: Math.floor(this.endNum) },
        {
          value: this.endNum,
          ease: 'power2.out',
          duration: 1.5,
          onUpdate: () => {
            if (++frame % 2 || this.value > this.endNum * 0.8) {
              this.update(false)
            }
          },
          onComplete: () => {
            this.nextElement &&
              gsap.set(this.nextElement, { clearProps: 'all' })
          },
        },
      )
    }

    return this.tl
  }

  getNum(str) {
    return (
      Number(String(str).match(this._regExp)?.join('').replace(',', '.')) || 0
    )
  }

  getStr(str) {
    return this.getNum(str).toLocaleString('ru-RU').replace(/\s/g, ' ')
  }

  getDecimalPlaces(num) {
    return num.toString().match(/\.(\d+)/)?.[1].length || 0
  }

  positionNextElement() {
    this.nextElement.parentElement.style.position = 'relative'

    Object.assign(this.nextElement.style, {
      position: 'absolute',
      left: this.nextElement.offsetLeft + 'px',
      top: 0,
    })
  }
}

export default AnimatedCounter
