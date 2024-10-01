import { APP } from '@js/app'
import htmx from 'htmx.org'
// htmx.logAll()

const htmxMultiSwap = () => {
  APP.plugins.htmx = htmx
  let api

  htmx.defineExtension('multi-swap', {
    init: function (apiRef) {
      api = apiRef
    },
    isInlineSwap: function (swapStyle) {
      return swapStyle.indexOf('multi:') === 0
    },
    handleSwap: function (swapStyle, target, fragment, settleInfo) {
      if (swapStyle.indexOf('multi:') === 0) {
        const selectorToSwapStyle = {}
        const elements = swapStyle.replace(/^multi\s*:\s*/, '').split(/\s*,\s*/)

        elements.map(function (element) {
          const split = element.split(/\s*:\s*/)
          const elementSelector = split[0]
          const elementSwapStyle =
            typeof split[1] !== 'undefined' ? split[1] : 'innerHTML'

          if (elementSelector.charAt(0) !== '#') {
            console.error(
              "HTMX multi-swap: unsupported selector '" +
                elementSelector +
                "'. Only ID selectors starting with '#' are supported.",
            )
            return
          }

          selectorToSwapStyle[elementSelector] = elementSwapStyle
        })

        for (const selector in selectorToSwapStyle) {
          const swapStyle = selectorToSwapStyle[selector]
          const elementToSwap = fragment.querySelector(selector)
          if (elementToSwap) {
            api.oobSwap(swapStyle, elementToSwap, settleInfo)
          } else {
            console.warn(
              "HTMX multi-swap: selector '" +
                selector +
                "' not found in source content.",
            )
          }
        }

        return true
      }
    },
  })
}

export default htmxMultiSwap
