import { APP } from './app'
import { Fancybox } from '@fancyapps/ui'
import print from 'print-js'
import htmx from 'htmx.org'
import NiceSelect from 'nice-select2/dist/js/nice-select2'
import dayjs from 'dayjs'
import gsap from 'gsap'
import Cookies from './modules/Cookies'

window.APP = APP

APP.on('ready', () => {
  APP.isShown = true

  new Cookies()

  document.querySelectorAll('.js-ui-select').forEach(
    (el) =>
      new NiceSelect(el, {
        searchable: true,
        placeholder: 'Выберите город',
        searchtext: el.dataset.niceSelectSearchText || 'Поиск',
        selectedtext: 'текст',
      }),
  )

  document.addEventListener('htmx:afterSettle', () => {
    APP.initModules((el) => {
      if ([...el.classList].includes('nice-select')) return false

      return !el.dataset.moduleId
    })
  })

  Fancybox.bind('[data-fancybox]', {
    Thumbs: {
      type: 'classic',
    },
    Toolbar: {
      display: {
        right: ['close'],
        left: [],
      },
    },
    Carousel: {
      Panzoom: {
        touch: false,
      },
      Navigation: {
        nextTpl: `<button>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.97656 1.54971L10.0766 9.64971C10.2766 9.84971 10.2766 10.1497 10.0766 10.3497L1.97656 18.4497" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
        `,
        prevTpl: `
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.125 1.54971L2.025 9.64971C1.825 9.84971 1.825 10.1497 2.025 10.3497L10.125 18.4497" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
        `,
      },
    },
    on: {
      reveal: (carousel) => {
        carousel.container
          .querySelectorAll('.f-button')
          .forEach((el) => el.setAttribute('title', ''))
      },
    },
  })

  document.addEventListener('htmx:afterSwap', (e) => {
    const catalogForm = document.querySelector('#catalog-form')

    if (catalogForm) {
      catalogForm.setAttribute('timestamp', Date.now())
      htmx.process(catalogForm)
    }
  })

  document.querySelectorAll('.js-date').forEach((el) => {
    el.innerHTML = dayjs(el.datetime).format('DD/MM/YYYY')
  })

  /**
   * Анимация появления элементов
   */
  const observeSubscribe = (element) => {
    gsap.set(element, {
      autoAlpha: 0,
      willChange: 'opacity',
      transition: 'none',
    })

    observer.observe(element)
  }

  const observeCallback = (entries, observer) => {
    entries.forEach((entry) => {
      const { isIntersecting, target } = entry

      if (isIntersecting) {
        observer.unobserve(target)

        const { width, height } = entry.rootBounds
        const { x, y } = entry.boundingClientRect

        const delay = x / (2 * width) + y / (4 * height)

        gsap.to(target, {
          autoAlpha: 1,
          ease: 'power1.out',
          delay,
          duration: 0.7,
          onComplete: () => {
            target.animationAppend && target.animationAppend()
            gsap.set(target, { clearProps: 'all' })
          },
        })
      }
    })
  }

  const observer = new IntersectionObserver(observeCallback)

  document
    .querySelectorAll(
      `
        .app-section,
        [class*="card"],
        header,
        footer,
        .btn,
        .btn-icon,
        .category-card,
        .dealer-card,
        .about-main,
        .benefits__item,
        .benefits-slider,
        .list-link,
        .ui-text-field,
        .text-content p,
        .text-content h2,
        .text-content h3,
        .text-content h4,
        .text-content li,
        .text-content table,
        .text-content iframe,
        .text-content figure,
        .js-figure
      `,
    )
    .forEach((element) => observeSubscribe(element))
})

/**
 * Project imports
 */

import ContactForm from './modules/ContactForm'
import AppPopup from './modules/AppPopup'
import Burger from './modules/Burger'

// App popup

window.appPopup = new AppPopup()

// Burger

new Burger()

// Contact Form

const form = document.querySelector('.js-contact-form')

if (form) {
  new ContactForm(form)
}

// Tabs
