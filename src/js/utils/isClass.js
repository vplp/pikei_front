/**
 * Check function is class
 * @param func { Function }
 * @returns {boolean}
 */
function isClass(func) {
  return (
    typeof func === 'function' &&
    /^class\s/.test(Function.prototype.toString.call(func))
  )
}

export default isClass
