var React = require('react')
var DragImage = require('./drag-image.jsx')
var { preventDefault } = require('./util')
var { Photo, replacePhoto } = require('./model')

var Collage = React.createClass({
  displayName: 'Collage',
  getInitialState () {
    return {
      photos: []
    }
  },
  updatePhotos (xs) {
    this.setState({
      photos: xs
    })
  },
  onDrop ({ dataTransfer: dt, clientX: x, clientY: y, currentTarget: t }) {
    var offset = t.getBoundingClientRect().top
    var src = dt.getData('text')
    var photo = Photo(src, x, y - offset)

    this.updatePhotos(replacePhoto(photo, this.state.photos))
  },
  render () {
    var imgs = this.state.photos.map(p => <DragImage src={ p.src } style={{ top: p.y, left: p.x }} key={ p.src } />)

    return (
      <div id="collage" onDrop={ this.onDrop } onDragOver={ preventDefault }>
        <div id="photos">{ imgs }</div>
      </div>
    )
  }
})

module.exports = Collage
