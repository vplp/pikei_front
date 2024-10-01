import Pretender from 'pretender'

export default new Pretender(function () {
  const routes = require.context('./routes/', true, /\.js$/)
  routes.keys().forEach((path) => routes(path).default(this))

  this.handledRequest = function (verb, path, request) {
    // eslint-disable-next-line no-console
    console.groupCollapsed(
      `Server: [${request.status}] ${verb.toUpperCase()} ${request.url}`,
    )
    const { requestBody, responseText } = request
    let loggedRequest, loggedResponse

    try {
      loggedRequest = JSON.parse(requestBody)
    } catch (e) {
      loggedRequest = requestBody
    }

    try {
      loggedResponse = JSON.parse(responseText)
    } catch (e) {
      loggedResponse = responseText
    }

    console.groupCollapsed('Response') // eslint-disable-line no-console
    console.log(loggedResponse) // eslint-disable-line no-console
    console.groupEnd() // eslint-disable-line no-console

    console.groupCollapsed('Request (data)') // eslint-disable-line no-console
    console.log(loggedRequest) // eslint-disable-line no-console
    console.groupEnd() // eslint-disable-line no-console

    console.groupCollapsed('Request (raw)') // eslint-disable-line no-console
    console.log(request) // eslint-disable-line no-console
    console.groupEnd() // eslint-disable-line no-console

    console.groupEnd() // eslint-disable-line no-console
  }

  this.unhandledRequest = function (verb, path, request) {
    if (path.indexOf('/api/') !== 0) {
      request.passthrough() // <-- A native, sent xhr is returned
    }
  }
})
