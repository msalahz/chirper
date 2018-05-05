import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, string, object } from 'prop-types'
import { handleAddTweet } from '../actions/tweets'

class TweetForm extends Component {
  static propTypes = {
    id: string,
    dispatch: func.isRequired,
    history: object
  }

  static defaultProps = {
    id: null,
    history: {}
  }

  state = {
    text: ''
  }

  handleSubmit = e => {
    e.preventDefault()

    const { text } = this.state
    const { history, dispatch, id } = this.props

    dispatch(handleAddTweet(text, id)).then(() => {
      this.setState(() => ({
        text: ''
      }))

      if (id === null) {
        history.push('/')
      }
    })
  }

  handleInputChange = e => {
    e.preventDefault()
    const text = e.target.value
    this.setState(() => ({ text }))
  }

  render() {
    const { text } = this.state

    return (
      <div>
        <h3 className="center">Compose new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            value={text}
            onChange={this.handleInputChange}
            placeholder="What's happening?"
            className="textarea"
            maxLength={280}
          />
          <button className="btn" type="submit" disabled={text.length === 0}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(TweetForm)
