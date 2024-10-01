import { Module } from './Module'

class SearchInput extends Module {
  constructor(element, ctx) {
    super(element, ctx)
  }

  init() {
    this.$element.addEventListener('focus', this.onFocus)
    this.searchResults = document.querySelector('.js-search-results')
  }
  destroy() {
    window.removeEventListener('click', this.onClickOutside)
  }

  onFocus = (e) => {
    e.target.closest('input').classList.add('_focus')
    e.target.addEventListener('blur', this.onBlur)
  }

  onBlur = (e) => {
    if (e.target.value.length === 0) {
      e.target.classList.remove('_focus')
      return
    }

    window.addEventListener('click', this.onClickOutside)
  }

  onClickOutside = (e) => {
    if (!e.target.closest('.js-search-results') || e.target !== this.$element) {
      this.$element.classList.remove('_focus')
      window.removeEventListener('click', this.onClickOutside)
    }
  }
}

export default SearchInput
