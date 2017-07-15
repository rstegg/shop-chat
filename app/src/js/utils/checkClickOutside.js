const isNodeFound = (current, componentNode, ignoreClass) => {
  if (current === componentNode) {
    return true
  }
  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass)
  }
  return current.classList.contains(ignoreClass)
}

const findHighest = (current, componentNode, ignoreClass) => {
  if (current === componentNode) {
    return true
  }
  let currentNode = current
  while (currentNode.parentNode) {
    if (isNodeFound(current, componentNode, ignoreClass)) {
      return true
    }
    currentNode = current.parentNode
  }
  return currentNode
}

const clickedScrollbar = evt => {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY
}

export default (componentNode, eventHandler, ignoreClass, excludeScrollbar, preventDefault, stopPropagation) => {
  return evt => {
    if (preventDefault) {
      evt.preventDefault()
    }
    if (stopPropagation) {
      evt.stopPropagation()
    }
    const current = evt.target
    if ( (excludeScrollbar && clickedScrollbar(evt)) || (findHighest(current, componentNode, ignoreClass) !== document) ) {
      return
    }
    eventHandler(evt)
  }
}
