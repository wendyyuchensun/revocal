class Template {
  constructor(props, state, root) {
    this.props = props
    this.state = state
    this.root = root

    this.virtualInstance = this.createVirtualInstance()
    this.DOMInstance = createDOMInstance(this.virtualInstance)
    this.root.appendChild(this.DOMInstance)
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)
    const newVirtualInstance = this.createVirtualInstance()
    reconcile(this.virtualInstance, newVirtualInstance, root, this.DOMInstance)
    this.virtualInstance = newVirtualInstance
  }
}

const reconcile = (prevInstance, nextInstance, root, DOMInstance) => {
  if (prevInstance.name !== nextInstance.name) {
    const newDOMInstance = createDOMInstance(nextInstance)
    root.replaceChild(newDOMInstance, DOMInstance)
    DOMInstance = newDOMInstance
  } else {
    if (prevInstance.text !== nextInstance.text) {
      DOMInstance.childNodes[0].nodeValue = nextInstance.text
    }

    if (prevInstance.events !== nextInstance.events) {
      if (prevInstance.events) {
        prevInstance.events.forEach(event => {
          const { name, handler } = event
          DOMInstance.removeEventListener(name, handler)
        }) 
      }

      if (nextInstance.events) {
        nextInstance.events.forEach(event => {
          const { name, handler } = event
          DOMInstance.addEventListener(name, handler)
        })
      }
    }

    const prevChildInstancesLength = prevInstance.childInstances && prevInstance.childInstances.length || 0
    const nextChildInstancesLength = nextInstance.childInstances && nextInstance.childInstances.length || 0
    const childrenCount = Math.max(prevChildInstancesLength, nextChildInstancesLength)
    for (let i = 0; i < childrenCount; i++) {
      const prevChildInstance = prevInstance.childInstances[i] || null
      const nextChildInstance = nextInstance.childInstances[i] || null
      const childDOMInstance = DOMInstance.childNodes[i] || null
      reconcile(prevChildInstance, nextChildInstance, DOMInstance, childDOMInstance)
    }
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
