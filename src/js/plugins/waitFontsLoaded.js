const waitFontsLoaded = async () => {
  await document.fonts.ready
}

export default waitFontsLoaded
