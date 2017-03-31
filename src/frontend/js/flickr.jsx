var React = require('react')
var { flickrSearch } = require('./model')

var Flickr = React.createClass({
  displayName: 'Flickr',
  getInitialState () {
    return {
      term: '',
      results: []
    }
  },
  termChanged (e) {
    this.setState({
      term: e.currentTarget.value
    })
  },
  updateResults (xs) {
    this.setState({
      results: xs
    })
  },
  searchClicked (e) {
    flickrSearch(this.state.term).fork(this.props.showError, this.updateResults)
  },
  render () {
    var imgs = this.state.results.map(src => <img src={ src } key={ src } />)

    return (
      <div id="flickr">
        <input onChange={ this.termChanged } />
        <button onClick={ this.searchClicked }>Search</button>
        <div id="results">{ imgs }</div>
      </div>
    )
  }
})

module.exports = Flickr
