import {
  auditInput,
  auditBus,
  enforceEqualLength,
  enforceSelNumMeet,
  prefilledArray,
  busOf0,
  busOf1,
  binary2Decimal
} from './helpers.mjs'

export const nand = (busA, busB) => {
  enforceEqualLength(busA, busB)
  return busA.map((inputA, i) => {
    const inputB = busB[i]
    auditInput(inputA)
    auditInput(inputB)
    return inputA === 1 && inputB === 1 ? 0 : 1
  })
}

export const not = bus => nand(bus, busOf1(bus.length))

export const and = (busA, busB) => {
  enforceEqualLength(busA, busB)
  return not(nand(busA, busB))
}

export const or = (...buses) => {
  enforceEqualLength(...buses)
  const result = busOf0(buses[0].length)
  return buses.reduce((busA, busB) => {
    return nand(nand(busA, busA), nand(busB, busB))
  }, result)
}

export const xor = (busA, busB) => {
  enforceEqualLength(busA, busB)
  const busC = nand(busA, busB)
  return nand(nand(busA, busC), nand(busB, busC))
}

export const mux = (sels, ...buses) => {
  auditBus(sels)
  enforceEqualLength(buses)
  enforceSelNumMeet(sels, buses)

  const selectedIndx = binary2Decimal(sels)
  return buses[selectedIndx].slice()
}

export const dmux = (sels, bus) => {
  auditBus(sels)

  const defaultResult = busOf0(bus.length)
  const resultNum = Math.pow(2, sels.length)
  const results = prefilledArray(resultNum, defaultResult)

  const selectedIndx = binary2Decimal(sels)
  results[selectedIndx] = bus.slice()

  return results
}
