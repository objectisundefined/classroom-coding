var React = require('react')
var Flickr = require('./flickr.jsx')

var App = React.createClass({
  displayName: 'App',

  // getInitialState :: {error :: String}
  getInitialState () {
    return {
      error: ''
    }
  },

  // showError :: String -> State Error
  showError (s) {
    this.setState({
      error: s
    })
  },

  render () {
    return (
      <div id="app">
        { this.state.error ? <p key={ 1 }>{this.state.error}</p> : null }
        <Flickr key={ 2 } showError={ this.showError } />
      </div>
    )
  }
})

module.exports = App
