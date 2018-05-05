import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">New Tweet</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav
