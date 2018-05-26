export default class Template { // eslint-disable-line
  constructor (props, state, root) {
    this.props = props
    this.state = state
    this.root = root

    this.virtualInstance = this.createVirtualInstance()
    this.DOMInstance = createDOMInstance(this.virtualInstance)
    this.root.appendChild(this.DOMInstance)
  }

  setState (partialState) {
    this.state = Object.assign({}, this.state, partialState)
    const newVirtualInstance = this.createVirtualInstance()
    reconcile(this.virtualInstance, newVirtualInstance, this.root, this.DOMInstance)
    this.virtualInstance = newVirtualInstance
  }
}

const createDOMInstance = virtualInstance => {
  if (!virtualInstance) return null

  const { name, text, attrs, value, events, childInstances } = virtualInstance
  const node = document.createElement(name)

  if (text !== null) {
    const textNode = document.createTextNode(text)
    node.appendChild(textNode)
  } else if (childInstances !== null) {
    childInstances.forEach(childInstance => {
      node.appendChild(createDOMInstance(childInstance))
    })
  }

  if (value) node.value = value

  if (attrs !== null) {
    attrs.forEach(attr => {
      const { name, value } = attr
      node.setAttribute(name, value)
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

const reconcile = (prevInstance, nextInstance, root, DOMInstance) => {
  if (prevInstance.name !== nextInstance.name) {
    const newDOMInstance = createDOMInstance(nextInstance)
    root.replaceChild(newDOMInstance, DOMInstance)
    DOMInstance = newDOMInstance
  } else {
    if (prevInstance.text !== nextInstance.text) {
      DOMInstance.childNodes[0].nodeValue = nextInstance.text
    }

    if (prevInstance.value !== nextInstance.value) DOMInstance.value = nextInstance.value

    const prevChildInstancesLength = (prevInstance.childInstances && prevInstance.childInstances.length) || 0
    const nextChildInstancesLength = (nextInstance.childInstances && nextInstance.childInstances.length) || 0
    const childrenCount = Math.max(prevChildInstancesLength, nextChildInstancesLength)
    for (let i = 0; i < childrenCount; i++) {
      const prevChildInstance = prevInstance.childInstances[i] || null
      const nextChildInstance = nextInstance.childInstances[i] || null
      const childDOMInstance = DOMInstance.childNodes[i] || null
      reconcile(prevChildInstance, nextChildInstance, DOMInstance, childDOMInstance)
    }

    if (prevInstance.attrs !== nextInstance.attrs) {
      if (prevInstance.attrs) {
        prevInstance.attrs.forEach(attr => {
          const { name } = attr
          DOMInstance.removeAttribute(name)
        })
      }

      if (nextInstance.attrs) {
        nextInstance.attrs.forEach(attr => {
          const { name, value } = attr
          DOMInstance.setAttribute(name, value)
        })
      }
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
  }
}
