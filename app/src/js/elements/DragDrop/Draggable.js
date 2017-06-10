import React from 'react'
import { compose } from 'redux'
import { DragSource, DropTarget } from 'react-dnd'

const Draggable = ({
  connectDragSource, connectDropTarget, isDragging,
  isOver, onMove, id, editing, children, ...props
}) => {
  // Pass through if we are editing
  const dragSource = editing ? a => a : connectDragSource

  return compose(dragSource, connectDropTarget)(
    <div style={{
      opacity: isDragging || isOver ? 0 : 1
    }} {...props}>{children}</div>
  )
}


const dragSource = {
  beginDrag(props) =>
  ({
      id: props.id
  })
}

const dragTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.id

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId})
    }
  }
}

const collectDragSource = (connect, monitor) =>
({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const collectDragTarget = (connect, monitor) =>
({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

export default compose(
  DragSource('product-option', dragSource, collectDragSource),
  DropTarget('product-view', dragTarget, collectDragTarget)
)(Draggable)
