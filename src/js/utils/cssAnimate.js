/**
 * Util for animation with css classes
 * example fade:
      .element {
         display: none;
         opacity: 0;
         visibility: hidden;
         transition: opacity .5s ease, visibility .5s ease;

         &._enter,
         &._enter-to,
         &._leave {
            display: flex;
         }
         &._enter-to {
            opacity: 1;
            visibility: visible;
         }
         &._leave {
            opacity: 0;
            visibility: hidden;
         }
     }
 * @param {HTMLElement} element
 * @param {boolean} toggle
 * @param {number} delay
 */
export default function cssAnimate(element, toggle = false, delay = 0) {
  const removeListener = () => {
    element._onCssAnimateEnd &&
      element.removeEventListener('transitionend', element._onCssAnimateEnd)
    element._onCssAnimateEnd = null
    element.classList.remove('_leave')
  }
  removeListener()

  if (toggle) {
    element.classList.add('_enter')
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      if (toggle) {
        element.classList.remove('_enter')
        element.classList.add('_enter-to')
      } else {
        element.classList.remove('_enter-to')
        element.classList.add('_leave')
        element._onCssAnimateEnd = (e) => {
          if (e.target === element) {
            removeListener()
            resolve()
          }
        }
        element.addEventListener('transitionend', element._onCssAnimateEnd)
      }
    }, 5 + delay)
  })
}
