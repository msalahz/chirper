import React, { Component } from 'react'
import { connect } from 'react-redux'
import { array } from 'prop-types'
import Tweet from './Tweet'

class Dashboard extends Component {
  static propTypes = {
    tweetIds: array.isRequired
  }

  render() {
    return (
      <div>
        <h3 className="center">Your Timeline</h3>

        <ul className="dashboard-list">
          {this.props.tweetIds.map(id => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ tweets }) {
  return { tweetIds: Object.keys(tweets) }
}

export default connect(mapStateToProps)(Dashboard)
