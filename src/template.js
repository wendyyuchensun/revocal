class Template {
  constructor(state, root) {
    this.state = state
    this.root = root

    this.virtualInstance = this.createVirtualInstance()
    this.DOMInstance = this.createDOMInstance()

    if (this.root && this.DOMInstance) this.root.appendChild(this.DOMInstance)
  }

  createVirtualInstance() {
    return null
  }

  createDOMInstance() {
    if (!this.virtualInstance) return null

    const { name, text, events } = this.virtualInstance
    const node = document.createElement(name)
    const textNode = document.createTextNode(text)
    node.appendChild(textNode)

    events.forEach(event => {
      const { name, handler } = event
      node.addEventListener(name, handler)
    })

    return node
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)

    const newVirtualInstance = this.createVirtualInstance()
    if (
      // TODO: compare events
      this.virtualInstance.name !== newVirtualInstance.name ||
      this.virtualInstance.text !== newVirtualInstance.text
    ) {
      this.virtualInstance = newVirtualInstance

      this.root.removeChild(this.DOMInstance)
      this.DOMInstance = this.createDOMInstance()
      this.root.appendChild(this.DOMInstance)
    }
  }
}
