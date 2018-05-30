import { not } from './gates.mjs'
import { add } from './alu.mjs'

export const auditInput = input => {
  if (input !== 0 && input !== 1) throw new TypeError('Only 0 or 1 allowed.')
}

export const auditBus = bus => {
  if (bus.length === 0) throw new RangeError('Bus should have length.')
  bus.forEach(auditInput)
}

export const enforceEqualLength = (...buses) => {
  const length = buses[0].length
  const isLengthEqual = buses.every(bus => bus.length === length)
  if (!isLengthEqual) throw new Error('Buses are not of equal length.')
}

export const enforceSelNumMeet = (sels, buses) => {
  const selNum = Math.pow(2, sels.length)
  if (buses.length !== selNum) {
    throw new Error('Number of selections should be equal to number of buses.')
  }
}

export const prefilledArray = (len, filling) => {
  if (len <= 0) throw new RangeError('Bus should have length.')

  if (typeof filling === 'number') auditInput(filling)
  else auditBus(filling)

  return (new Array(len)).fill(filling)
}

export const busOf0 = len => prefilledArray(len, 0)

export const busOf1 = len => prefilledArray(len, 1)

export const binary2Decimal = bus => {
  auditBus(bus)
  return bus.reverse().reduce((result, input, i) => {
    const increament = (input === 0) ? 0 : Math.pow(2, i)
    return result + increament
  }, 0)
}

export const int0 = busOf0

export const int1 = len => {
  if (len < 1) throw new RangeError('Bus should have length.')

  const result = busOf0(len)
  result[len - 1] = 1
  return result
}

export const intMinus1 = busOf1

export const isInt0 = bus => {
  auditBus(bus)
  return bus.every(input => input === 0)
}

export const negate = bus => {
  auditBus(bus)

  if (isInt0(bus)) return bus

  const result = not(bus)
  return add(result, int1(result.length))
}
