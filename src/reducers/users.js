import makeReducer from './makeReducer'
import { RECEIVE_USERS } from '../actions/users'

export default makeReducer({
  [RECEIVE_USERS]: (state, { users = {} } = {}) => users
})
