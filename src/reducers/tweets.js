import makeReducer from './makeReducer'
import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets'

export default makeReducer({
  [RECEIVE_TWEETS]: (state, { tweets = {} } = {}) => tweets,
  [TOGGLE_TWEET]: (state, { id, authedUser, hasLiked }) => ({
    ...state,
    [id]: {
      ...state[id],
      likes: hasLiked
        ? state[id].likes.filter(user => user !== authedUser)
        : state[id].likes.concat([authedUser])
    }
  })
})
