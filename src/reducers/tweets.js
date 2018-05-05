import makeReducer from './makeReducer'
import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

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
  }),
  [ADD_TWEET]: (state, { tweet }) => {
    const replyingTo =
      tweet.replyingTo === null
        ? {}
        : {
            [tweet.replyingTo]: {
              ...state[tweet.replyingTo],
              replies: state[tweet.replyingTo].replies.concat([tweet.id])
            }
          }

    return {
      ...state,
      [tweet.id]: tweet,
      ...replyingTo
    }
  }
})
