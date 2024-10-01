import { getResponse } from '../utils'

/**
 * Form route
 */
export default (pretender) => {
  pretender.post('/api/contact-form', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(null)]
  })
}
