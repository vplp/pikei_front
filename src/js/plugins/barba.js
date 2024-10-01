import { APP } from '../app'
import barba from '@barba/core'

function destroy(data) {
  APP.isReady = false
  APP.isShown = false

  const namespace =
    data.current.container.getAttribute('data-barba-namespace') || ''

  APP.destroyModules((activeModule) => {
    const { $element } = activeModule.instance

    return !!$element.closest(`[data-barba-namespace="${namespace}"]`)
  })
}

async function init(data) {
  const namespace =
    data.next.container.getAttribute('data-barba-namespace') || ''

  await APP.initModules((element) => {
    return !!element.closest(`[data-barba-namespace="${namespace}"]`)
  })

  APP.isReady = true
}

const barbaPlugin = (ctx) => {
  const barbaConfig = {
    transitions: [
      {
        name: 'default-transition',
        beforeLeave(data) {
          destroy(data)
        },
        async enter(data) {
          await init(data)

          APP.isShown = true
        },
      },
    ],
  }

  barba.init(barbaConfig)
}

export default barbaPlugin
