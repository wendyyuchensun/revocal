class Input extends Template {
  createVirtualInstance() {
    return {
      name: 'span',
      text: this.props.input,
      events: [],
    }
  }
}

const gates = {
  'nand': nand,
  'and': and,
  'or': or,
  'xor': xor,
}

class Chip extends Template {
  createVirtualInstance() {
    return {
      name: 'div',
      text: null,
      attrs: null,
      value: null,
      events: null,
      childInstances: [
        {
          name: 'select',
          text: null,
          attrs: null,
          value: this.state.gate,
          events: [
            {
              name: 'change',
              handler: e => {
                this.setState({ gate: e.target.value })
              },
            },
          ],
          childInstances: Object.keys(gates).map(gateName => {
            return {
              name: 'option',
              text: gateName,
              attrs: null,
              events: null,
              chidInstances: null,
            }
          }),
        },
        {
          name: 'span',
          text: this.state.inputA,
          attrs: null,
          value: null,
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
          attrs: null,
          value: null,
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
          text: gates[this.state.gate]([this.state.inputA], [this.state.inputB]),
          attrs: null,
          value: null,
          events: null,
          childInstances: null,
        }
      ],
    }
  }
}

const root = document.querySelector('.root')
const chip = new Chip(null, { gate: Object.keys(gates)[0], inputA: 1, inputB: 1 }, root)
