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

export const add = (busA, busB) => {
  const reversedBusA = busA.reverse()
  const reversedBusB = busB.reverse()

  let carry = [0]
  const reversedResult = reversedBusA.map((bitA, i) => {
    const result = fullAdder([bitA], [reversedBusB[i]], carry)
    carry = result.carry
    return result.sum[0]
  })

  return reversedResult.reverse()
}
