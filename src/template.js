class Template {
  constructor(props, state, root) {
    this.props = props
    this.state = state
    this.root = root

    this.virtualInstance = this.createVirtualInstance()
    this.DOMInstance = createDOMInstance(this.virtualInstance)

    if (this.root && this.DOMInstance) this.root.appendChild(this.DOMInstance)
  }

  createVirtualInstance() {
    return null
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)

    // TODO: reconcile
    this.virtualInstance = this.createVirtualInstance()
    this.root.removeChild(this.DOMInstance)
    this.DOMInstance = createDOMInstance(this.virtualInstance)
    this.root.appendChild(this.DOMInstance)
  }
}

const createDOMInstance = virtualInstance => {
  if (!virtualInstance) return null

  const { name, text, events, childInstances } = virtualInstance
  const node = document.createElement(name)

  if (text !== null) {
    const textNode = document.createTextNode(text)
    node.appendChild(textNode)
  } else if (childInstances !== null) {
    childInstances.forEach(childInstance => {
      node.appendChild(createDOMInstance(childInstance))
    })
  }

  if (events !== null) {
    events.forEach(event => {
      const { name, handler } = event
      node.addEventListener(name, handler)
    })
  }

  return node
}
