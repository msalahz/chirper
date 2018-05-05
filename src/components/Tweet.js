import React, { Component } from 'react'
import { connect } from 'react-redux'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { object, func, string } from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleToggleTweet } from '../actions/tweets'

class Tweet extends Component {
  static propTypes = {
    tweet: object.isRequired,
    dispatch: func.isRequired,
    history: object.isRequired,
    authedUser: string.isRequired
  }

  toParent = (e, id) => {
    e.preventDefault()

    this.props.history.push(`/tweet/${id}`)
  }

  handleLike = (e, id) => {
    e.preventDefault()

    const { dispatch, authedUser, tweet } = this.props

    dispatch(
      handleToggleTweet({
        id,
        authedUser,
        hasLiked: tweet.hasLiked
      })
    )
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
      <Link to={`/tweet/${id}`}>
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
              <TiArrowBackOutline className="tweet-icon" />
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
      </Link>
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

export default withRouter(connect(mapStateToProps)(Tweet))
