import {
  auditBus,
  enforceEqualLength,
  int0,
  int1
} from './helpers.mjs'

import {
  not,
  and,
  or,
  xor
} from './gates.mjs'

// adder
export const add = (busA, busB) => {
  auditBus(busA)
  auditBus(busB)
  enforceEqualLength(busA, busB)

  let carry = [0]
  const result = []

  for (let i = busA.length - 1; i >= 0; i--) {
    const inputA = [busA[i]]
    const inputB = [busB[i]]

    const sum = xor(xor(inputA, inputB), carry)
    result.push(sum[0])

    carry = or(
      and(inputA, inputB),
      and(inputB, carry),
      and(carry, inputA)
    )
  }

  result.reverse()
  return result
}

export const inc1 = bus => add(bus, int1(bus.length))

// alu
const auditControlBits = (...controlBits) => auditBus(controlBits)

const produceInput = (bus, z, n) => {
  let result = z ? int0(bus.length) : bus.slice()
  return n ? not(result) : result
}

export const alu = (busA, busB, za, na, zb, nb, f, no) => {
  auditControlBits(za, na, zb, nb, f, no)
  enforceEqualLength(busA, busB)

  const a = produceInput(busA, za, na)
  const b = produceInput(busB, zb, nb)
  const result = f ? add(a, b) : and(a, b)
  return no ? not(result) : result
}
