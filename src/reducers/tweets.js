import makeReducer from './makeReducer'
import { RECEIVE_TWEETS } from '../actions/tweets'

export default makeReducer({
  [RECEIVE_TWEETS]: (tweets = {}) => tweets
})
