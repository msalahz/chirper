import { showLoading, hideLoading } from 'react-redux-loading'
import { saveLikeToggle, saveTweet } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

export function handleToggleTweet(info) {
  return dispatch => {
    dispatch(toggleTweet(info))
    saveLikeToggle(info).catch(e => {
      console.warn('handelToggleTweet failed!', e)
      dispatch(toggleTweet(info))
      alert('Failed to toggle tweet like!')
    })
  }
}

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser: author } = getState()

    dispatch(showLoading())
    return saveTweet({
      text,
      author,
      replyingTo
    })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}
