import { Module } from '@js/modules/Module'
import transitionExpand from '@js/utils/transitionExpand'

const CLASSES = {
  ACTIVE: '_opened',
}

export default class Accordion extends Module {
  state = false
  toggle = null
  content = null

  constructor(element, ctx) {
    super(element, ctx)

    this.toggleHandler = this.onToggle.bind(this)
  }

  init() {
    this.state = this.$element.classList.contains('_opened')
    this.$element.accordionInstance = this
    this.toggle = this.$element.querySelector('.js-accordion-toggle')
    this.content = this.$element.querySelector('.js-accordion-content')

    this.toggle.addEventListener('click', this.toggleHandler)
  }

  destroy() {
    this.toggle.removeEventListener('click', this.toggleHandler)

    this.$element.accordionInstance = null
  }

  onToggle() {
    this.state ? this.close() : this.open()
  }

  open(instant) {
    transitionExpand(this.content, true, instant)
    this.$element.classList.add(CLASSES.ACTIVE)
    this.state = true

    this.emitOpenAccordion()
  }

  close(instant) {
    transitionExpand(this.content, false, instant)
    this.$element.classList.remove(CLASSES.ACTIVE)
    this.state = false
  }

  emitOpenAccordion() {
    this.$element.dispatchEvent(new CustomEvent('accordion:open'))
  }
}
