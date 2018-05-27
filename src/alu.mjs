import {
  prefilledArray,
  xor,
  and,
  or
} from './gates.mjs'

// helpers
export const one = len => {
  const one = prefilledArray(len, 0)
  one[0] = 1
  return one
}

// adders
export const add = (busA, busB) => {
  let carry = [0]

  return busA.map((a, i) => {
    const inputA = [a]
    const inputB = [busB[i]]

    const sum = xor(xor(inputA, inputB), carry)
    carry = or(
      and(inputA, inputB),
      and(inputB, carry),
      and(carry, inputA)
    )

    return sum[0]
  })
}

export const inc1 = bus => add(bus, one(bus.length))

// alu
