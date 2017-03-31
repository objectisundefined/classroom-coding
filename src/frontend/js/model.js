var Task = require('data.task')
var { compose, replace, prop, map } = require('ramda')

var Http = {
  // get :: String -> Task Error JSON
  get: url => new Task((reject, resolve) => {
    fetch(url).then(res => res.text()).then(res => res.slice(res.indexOf('{'), -1)).then(JSON.parse).then(resolve)
  })
}

var baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

// makeUrl :: String -> String
var makeUrl = t => replace('{TAGS}', t, baseUrl)

// extractUrls :: JSON -> [String]
var extractUrls = compose(map(prop('url_s')), prop('photo'), prop('photos'))

// flickrSearch :: Term -> Task Error JSON
var flickrSearch = compose(map(extractUrls), Http.get, makeUrl)

module.exports = { flickrSearch }

/*
map(extractUrls)(Http.get(makeUrl('cats'))).fork(console.error, console.log)

// console.log(map(x => x + 1)([1, 2, 3]))

// console.log(Http.get().map(extractUrls).fork(console.error, console.log))
*/
