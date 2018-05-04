import makeReducer from './makeReducer'
import { SET_AUTHED_USER } from '../actions/authedUser'

export default makeReducer({
  [SET_AUTHED_USER]: (id = null) => id
})
