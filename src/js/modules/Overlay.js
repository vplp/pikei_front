import { gsap } from 'gsap'

class Overlay {
  constructor(instance) {
    this.$overlay = document.querySelector('.overlay')
    this.instance = instance

    this.isShown = false

    this.tl = gsap.timeline()

    this.$overlay.addEventListener('click', () => this.hide())
  }

  show() {
    this.isShown = true

    this.tl
      .set(this.$overlay, { css: { display: 'block' } })
      .set(this.$overlay, { opacity: 0 })
      .to(this.$overlay, { opacity: 1, duration: 0.35 })
  }

  hide() {
    this.isShown = false

    this.tl
      .to(this.$overlay, {
        opacity: 0,
        duration: 0.35,
      })
      .set(this.$overlay, { css: { display: 'none' } })

    this.instance?.hide()
  }
}

export default Overlay
