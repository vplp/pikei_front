import { Module } from './Module'

class Share extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.shareData = {
      title: element.dataset.title,
      text: element.dataset.text,
      url: element.getAttribute('href'),
    }
  }

  init() {
    if (navigator.share && navigator.canShare(this.shareData)) {
      this.addClickhandler()

      return
    }

    this.$element.remove()
  }

  addClickhandler() {
    this.$element.addEventListener('click', (e) => {
      e.preventDefault()

      navigator.share(this.shareData)
    })
  }
}

export default Share
