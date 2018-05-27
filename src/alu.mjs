import {
  and,
  xor
} from './gates'

class AddResult {
  constructor () {
    this.result = { sum: [0], carry: [0] }
  }

  add (bit) {
    const { sum, carry } = this.result
    this.result = {
      sum: xor(sum, bit),
      carry: xor(carry, and(sum, bit))
    }

    return this
  }
}

export const halfAdder = (bitA, bitB) => (new AddResult()).add(bitA).add(bitB).result

export const fullAdder = (bitA, bitB, carry) => (new AddResult()).add(bitA).add(bitB).add(carry).result
