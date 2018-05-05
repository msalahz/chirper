import React, { Component } from 'react'
import { object, array } from 'prop-types'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import TweetForm from './TweetForm'

class TweetPage extends Component {
  static propTypes = {
    match: object.isRequired,
    tweetReplies: array
  }

  static defaultProps = {
    tweetReplies: []
  }

  render() {
    const { tweetReplies, match } = this.props
    const { id } = match.params

    return (
      <div>
        <Tweet id={id} />
        <TweetForm id={id} />
        <ul>
          {tweetReplies.length > 0 &&
            tweetReplies.map(replyId => (
              <li key={replyId}>
                <Tweet id={replyId} />
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ tweets }, { match }) {
  return { tweetReplies: tweets[match.params.id].replies }
}

export default connect(mapStateToProps)(TweetPage)
