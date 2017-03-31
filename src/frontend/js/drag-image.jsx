var React = require('react')

var DragImage = React.createClass({
  displayName: 'DragImage',
  onDragStart ({ dataTransfer: dt, currentTarget: t }) {
    dt.setData('text', t.src)
  },
  render () {
    return <img { ...this.props } draggable={ true } onDragStart={ this.onDragStart } />
  }
})

module.exports = DragImage
