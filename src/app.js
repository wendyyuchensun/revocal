class Input extends Template {
  createVirtualInstance() {
    return {
      name: 'span',
      text: this.state.input,
      events: [
        {
          name: 'click',
          handler: e => {
            if (this.state.input === 1) this.setState({ input: 0 })
            else if (this.state.input === 0) this.setState({ input: 1 })
          },
        },
      ],
    }
  }
}

const root = document.querySelector('.root')
const input = new Input({ input: 0 }, root)
