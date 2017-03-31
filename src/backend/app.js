var express = require('express')
var path = require('path')
var server = require('./server')
var bodyParser = require('body-parser')

var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'public')))

var port = 3000
var host = 'localhost'

var main = () => {
  server(app)

  app.listen(port, host, () => console.info('Express: listening on 3000'))
}

main()
