import Toastify from 'toastify-js'
import { APP } from '@js/app'

class Toasts {
  success(text) {
    Toastify({
      text: text,
      duration: 4000,
      className: '_success',
    }).showToast()
  }

  error(text) {
    Toastify({
      text: text,
      duration: 4000,
      className: '_error',
    }).showToast()
  }

  cookie({
    node = document.getElementById('cookie-popup'),
    onClose = () => {},
  }) {
    const toast = Toastify({
      node,
      text: 'Мы используем куки на нашем сайте',
      duration: -1,
      gravity: 'bottom',
      position: 'center',
      className: '_cookie',
      close: false,
      style: {
        background: 'transparent',
        'box-shadow': 'none',
        'max-width': 'none',
        cursor: 'auto',
      },
    })

    node.querySelector('.btn').addEventListener(
      'click',
      () => {
        onClose()
        toast.hideToast()
      },
      { once: true },
    )

    toast.showToast()
  }
}

const toasts = (ctx) => {
  APP.plugins.toast = new Toasts()
}

export default toasts
