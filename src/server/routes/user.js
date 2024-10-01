import user from '../collections/user'
import { getResponse } from '../utils'

/**
 * User routes
 */
export default (pretender) => {
  // Get user data
  pretender.get('/api/user', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(user)]
  })

  // Update user
  pretender.post('/api/user/update', () => {
    return [200, { 'Content-Type': 'application/json' }, getResponse(user)]
  })
}
