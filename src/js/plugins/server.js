const serverPlugin = () => {
  if (process.env.NODE_ENV === 'development') {
    require('@server/index.js')
  }
}

export default serverPlugin
