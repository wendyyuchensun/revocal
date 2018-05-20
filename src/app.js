class Input extends Template {
  createVirtualInstance() {
    return {
      name: 'span',
      text: this.props.input,
      events: [],
    }
  }
}

class Chip extends Template {
  createVirtualInstance() {
    return {
      name: 'div',
      text: null,
      events: null,
      childInstances: [
        {
          name: 'span',
          text: this.state.inputA,
          events: [
            {
              name: 'click',
              handler: () => {
                if (this.state.inputA === 0) this.setState({ inputA: 1 })
                else if (this.state.inputA === 1) this.setState({ inputA: 0 })
              },
            },
          ],
          childInstances: null,
        },
        {
          name: 'span',
          text: this.state.inputB,
          events: [
            {
              name: 'click',
              handler: () => {
                if (this.state.inputB === 0) this.setState({ inputB: 1 })
                else if (this.state.inputB === 1) this.setState({ inputB: 0 })
              },
            },
          ],
          childInstances: null,
        },
        {
          name: 'span',
          text: nand([this.state.inputA], [this.state.inputB]),
          events: null,
          childInstances: null,
        }
      ],
    }
  }
}

const root = document.querySelector('.root')
const chip = new Chip(null, { inputA: 1, inputB: 1 }, root)
