function createRange (node, offset, endOffset) {
  let range = new Range()
  range.setStart(...setOnNodeOffset(node, offset))
  range.setEnd(...setOnNodeOffset(node, endOffset))
  let sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

function getRange (node) {
  let sel = window.getSelection()
  return {
    offset: getFullNodeOffset(sel, node),
    endOffset: getFullNodeExtent(sel, node)
  }
}

function setOnNodeOffset (node, offset) {
  let size = getLength(node)
  let childNodes = node.childNodes
  if (!childNodes.length) {
    if (size >= offset) {
      return [node, offset]
    }
  }
  for (let i = 0; i < childNodes.length; i++) {
    let n = childNodes[i]
    let l = getLength(n)
    if (l >= offset) {
      return setOnNodeOffset(n, offset)
    } else {
      offset -= l
    }
  }
}

function getFullNodeOffset (sel, node) {
  let range = sel.getRangeAt(0)
  let info = range.commonAncestorContainer
  let parent = info.parentElement
  let anchor = sel.anchorNode
  if (node === anchor) {
    return sel.anchorOffset
  }
  if (node === parent || node === info) {
    let offsetSum = 0
    if (node) {
      let childNodes = node.childNodes
      for (let i = 0; i < childNodes.length; i++) {
        let n = childNodes[i]
        if (n.contains(anchor)) {
          if (n === anchor) {
            return offsetSum + sel.anchorOffset
          } else {
            return offsetSum + getFullNodeOffset(sel, n)
          }
        } else {
          offsetSum += getLength(n)
        }
      }
    }
    return offsetSum
  } else {
    let offsetSum = range.startOffset
    return offsetSum + Number(parent.getAttribute('data-start-index'))
  }
}

function getFullNodeExtent (sel, node) {
  return getFullNodeOffset(sel, node) + sel.toString().length
}

function getLength (node) {
  if (node.innerText) {
    return node.innerText.length || 0
  } else {
    return node.length || 0
  }
}

export { setOnNodeOffset, getFullNodeOffset, createRange, getRange }
