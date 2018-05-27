import {
  auditInputBus,
  prefilledArray,
  not,
  and,
  or,
  xor
} from './gates.mjs'

// helpers
export const zero = len => prefilledArray(len, 0)

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
export const isZero = bus => {
  if (bus.length === 1) return bus[0] === 0
  return bus.slice(0, bus.length - 1).every(input => input === 0)
}

export const negate = bus => {
  if (isZero(bus) || bus.length === 1) return bus.slice()

  const lastIndx = bus.length - 1
  return bus.map((input, i) => (i === lastIndx) ? not([input])[0] : input)
}

const auditControlBits = (...controlBits) => controlBits.forEach(auditInputBus)

const produceInput = (bus, z, n) => {
  let result = isZero(z) ? bus.slice() : prefilledArray(bus.length, 0)
  return isZero(n) ? result : not(result)
}

export const alu = (busA, busB, za, na, zb, nb, f, no) => {
  auditControlBits(za, na, zb, nb, f, no)
  const a = produceInput(busA, za, na)
  const b = produceInput(busB, zb, nb)
  const result = isZero(f) ? and(a, b) : add(a, b)
  return isZero(no) ? result : not(result)
}
