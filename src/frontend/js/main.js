require('whatwg-fetch')

var React = require('react')
var Dom = require('react-dom')
var App = require('./app.jsx')

Dom.render(<App />, document.getElementById('main'))
