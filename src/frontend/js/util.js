var Task = require('data.task')
var { curry } = require('ramda')
var { Just, Nothing } = require('data.maybe')

var preventDefault = e => e.preventDefault()

var Http = {
  // get :: String -> Task Error JSON
  get: url => new Task((reject, resolve) => {
    fetch(url).then(res => res.text()).then(res => res.slice(res.indexOf('{'), -1)).then(JSON.parse).then(resolve)
  })
}

var indexOf = curry((x, xs) => {
  var idx = xs.indexOf(x)

  return idx < 0 ? Nothing() : Just(idx)
})

module.exports = {
  preventDefault,
  Http,
  indexOf
}
