import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { func, bool } from 'prop-types'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import TweetForm from './TweetForm'
import Nav from './Nav'

class App extends Component {
  static propTypes = {
    loading: bool.isRequired,
    dispatch: func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true ? null : (
            <div className="container">
              <Nav />
              <Route exact path="/" component={Dashboard} />
              <Route path="/new" component={TweetForm} />
            </div>
          )}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
