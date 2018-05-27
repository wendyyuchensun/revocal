import {
  and,
  or,
  xor,
  prefilledArray
} from './gates.mjs'

const bitify = arr => arr.map(elm => [elm])
const reverseBitify = arr => arr.map(elm => elm[0])

export const add = (busA, busB) => {
  const bitifiedBusA = bitify(busA)
  const bitifiedBusB = bitify(busB)

  let carry = [0]
  const bitifiedSum = bitifiedBusA.map((inputA, i) => {
    const inputB = bitifiedBusB[i]
    const sum = xor(xor(inputA, inputB), carry)

    carry = or(
      and(inputA, inputB),
      and(inputB, carry),
      and(carry, inputA)
    )

    return sum
  })

  return reverseBitify(bitifiedSum)
}

export const inc1 = bus => {
  const one = prefilledArray(bus.length, 0)
  one[0] = 1
  return add(bus, one)
}
