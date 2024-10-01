import { APP } from '../app'

class Cookies {
  constructor() {
    this.checkCookies()
  }

  setCookie(name, value, days) {
    let expires = ''
    if (days) {
      let date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)',
      ),
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  checkCookies() {
    if (!this.getCookie('cookies_policy')) {
      APP.plugins.toast.cookie({
        onClose: () => this.setCookie('cookies_policy', 'true', 365),
      })
    }
  }
}

export default Cookies
