import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import gsap from 'gsap'

export default class AppPopup {
  /**
   * @constructor
   */
  constructor() {
    this.popupIsOpen = false
    this.popupUI = {
      element: document.querySelector('.js-app-popup'),
      inner: document.querySelector('.js-app-popup-inner'),
      btn: document.querySelector('.js-app-popup-btn'),
      content: document.querySelector('.js-app-popup-content'),
    }

    // document.querySelectorAll('[data-popup-activator]').forEach((element) => {
    //   const popupId = element.getAttribute('data-popup-activator')

    //   element.addEventListener('click', (e) => {
    //     e.preventDefault()

    //     this.open(popupId)
    //   })
    // })

    this.popupUI.btn.addEventListener('click', () => this.close())
    this.popupUI.inner.addEventListener('click', (e) => {
      const target = e.target
      if (!target) return

      if (
        target.classList.contains('js-app-popup-inner') ||
        target.classList.contains('js-app-popup-content')
      )
        this.close()
    })
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') this.close()
    })
  }

  /**
   * @param {string} id
   */
  open(content) {
    // let content = document.querySelector(`[data-popup=${id}]`)

    // if (content.getAttribute('data-popup-no-clone') === null) {
    //   content = content.cloneNode(true)
    // }

    if (!content) return

    disableBodyScroll(this.popupUI.element, { reserveScrollBarGap: true })

    // gsap.set(content, { clearProps: 'display' })
    this.popupUI.content.innerHTML = content
    // this.popupUI.content.appendChild(content)

    const timeline = gsap.timeline({
      onComplete: () => {
        this.popupIsOpen = true
      },
    })
    timeline.set(this.popupUI.content, { display: 'none' })
    timeline.fromTo(
      this.popupUI.element,
      { opacity: 0, clearProps: 'display' },
      { opacity: 1, duration: 0.35 },
    )
    timeline.fromTo(
      this.popupUI.content,
      { opacity: 0, scale: 0.5, clearProps: 'display' },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' },
      '>-0.35',
    )
  }

  close() {
    if (!this.popupIsOpen) return
    this.popupIsOpen = false

    const timeline = gsap.timeline({
      onComplete: () => {
        enableBodyScroll(this.popupUI.element)
      },
    })
    timeline.to(this.popupUI.content, {
      opacity: 0,
      scale: 0.5,
      duration: 0.25,
      ease: 'back.in(1.7)',
    })
    timeline.to(this.popupUI.element, { opacity: 0, duration: 0.25 }, '>-0.25')
    timeline.set(this.popupUI.element, { display: 'none' })
  }
}
