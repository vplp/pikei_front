import { Module } from './Module'

class NavHighlight extends Module {
  constructor(element, ctx) {
    super(element, ctx)

    this.$element = element
  }

  init() {
    const { highlightId } = this.$element.dataset

    const highlightItems = Array.from(
      this.$element.querySelectorAll(`[id^=${highlightId}]`),
    )
    const highlightLinks = Array.from(
      document.querySelectorAll(`a[href^='#${highlightId}']`),
    )

    const nav = document.querySelector('.js-contents-nav')
    const navY = nav.getBoundingClientRect().top + window.scrollY

    highlightLinks[0].parentElement.classList.add('_active')

    const headerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-height',
      ),
    )

    const marginTop = 32

    window.addEventListener('scroll', () => {
      const isHeaderHidden =
        document.documentElement.classList.contains('_header-hidden')

      if (window.scrollY >= navY - (isHeaderHidden ? 0 : headerHeight)) {
        nav.style.top = (isHeaderHidden ? 0 : headerHeight) + marginTop + 'px'
      } else {
        nav.style.top = (isHeaderHidden ? marginTop : headerHeight) + 'px'
      }

      const highlighted = highlightItems.filter((el) => {
        if (
          document.documentElement.scrollHeight - window.scrollY <=
          window.innerHeight
        ) {
          return (
            el.offsetTop <=
            window.scrollY +
              window.innerHeight +
              (isHeaderHidden ? 0 : headerHeight)
          )
        }
        return (
          el.offsetTop <= window.scrollY + (isHeaderHidden ? 0 : headerHeight)
        )
      })

      if (!highlighted.length) return

      highlightLinks.forEach((el) =>
        el.parentElement.classList.remove('_active'),
      )
      highlightLinks[highlighted.length - 1].parentElement.classList.add(
        '_active',
      )
    })
  }

  destroy() {}
}

export default NavHighlight
