import React, { Component } from 'react'
import { connect } from 'react-redux'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { object } from 'prop-types'
import { formatTweet, formatDate } from '../utils/helpers'

class Tweet extends Component {
  static propTypes = {
    tweet: object.isRequired
  }

  toParent = (e, id) => {
    e.preventDefault()

    // TODO: Redirect to tweet page
  }

  handleReply = (e, id) => {
    e.preventDefault()

    // TODO: Redirect to tweet page
  }

  handleLike = (e, id) => {
    e.preventDefault()

    // TODO: Mark tweet as liked by current autheed user
  }
  render() {
    const { tweet } = this.props

    if (tweet === null) {
      return <p>This Tweet doesn't existd</p>
    }

    const {
      name,
      id,
      timestamp,
      text,
      avatar,
      likes,
      replies,
      hasLiked,
      parent
    } = tweet

    return (
      <div className="tweet">
        <img src={avatar} alt={name} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                `Replying to @${parent.author}`
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline
              className="tweet-icon"
              onClick={e => this.handleReply(e, id)}
            />
            <span>{replies !== 0 && replies}</span>
            <button
              className="heart-button"
              onClick={e => this.handleLike(e, id)}
            >
              {hasLiked ? (
                <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, tweets, users }, { id }) {
  const tweet = tweets && tweets[id]
  const parentTweet = tweet && tweets[tweet.replyingTo]

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

export default connect(mapStateToProps)(Tweet)
