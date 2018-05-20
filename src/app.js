class Input extends Template {
  createVirtualInstance() {
    return {
      name: 'span',
      text: this.state.input
    }
  }
}

const root = document.querySelector('.root')
const input = new Input({ input: 0 }, root)
setTimeout(() => input.setState({ input: 1 }), 10000)
