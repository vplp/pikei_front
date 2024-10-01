import { APP } from '../app'

const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
}

class Responsive {
  static isMediaQuery = (query = '') => window.matchMedia(query).matches

  mobile = false
  tablet = false
  fromMobile = false
  fromTablet = false

  constructor() {
    this.update()
    window.addEventListener('resize', () => {
      this.update()
    })
  }

  update() {
    this.mobile = Responsive.isMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`)
    this.tablet = Responsive.isMediaQuery(`(max-width: ${BREAKPOINTS.md}px)`)

    this.fromMobile = Responsive.isMediaQuery(
      `(min-width: ${BREAKPOINTS.sm + 1}px)`,
    )
    this.fromTablet = Responsive.isMediaQuery(
      `(min-width: ${BREAKPOINTS.md + 1}px)`,
    )
  }
}

const responsive = (ctx) => {
  APP.plugins.responsive = new Responsive()
}

export default responsive
