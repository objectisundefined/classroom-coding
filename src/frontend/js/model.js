var { curry, append, remove, compose, replace, prop, map } = require('ramda')
var { indexOf, Http } = require('./util')
var { fold } = require('pointfree-fantasy')
var { Some, None } = require('fantasy-options')
var daggy = require('daggy')

// mayToOpt :: Maybe a -> Option a
var mayToOpt = m => m.cata({ Just: Some, Nothing: () => None })

// Photo :: (src :: String, x :: Number, y :: Number)
var Photo = daggy.tagged('src', 'x', 'y')

// newPhoto :: String -> Photo
var newPhoto = url => Photo(url, 0, 0)

var baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

// makeUrl :: String -> String
var makeUrl = t => replace('{TAGS}', t, baseUrl)

// toPhoto :: JSON -> [Photo]
var toPhoto = compose(map(compose(newPhoto, prop('url_s'))), prop('photo'), prop('photos'))

// flickrSearch :: Term -> Task Error JSON
var flickrSearch = compose(map(toPhoto), Http.get, makeUrl)

// indexOfPhoto :: Photo -> [Photo] -> Number
var indexOfPhoto = curry((p, ps) => indexOf(p.src, ps.map(prop('src'))))

// replacePhoto :: Photo -> [Photo] -> [Photo]
var replacePhoto =
  curry(
    (p, ps) =>
      compose(fold(append(p), () => append(p, ps)),
        mayToOpt,
        map(i => remove(i, 1, ps)),
        indexOfPhoto(p)
      )(ps))

module.exports = { flickrSearch, Photo, replacePhoto }
