export const auditInput = input => {
  if (input !== 0 && input !== 1) {
    throw new TypeError('Only 0 or 1 allowed.')
  }
}

export const auditInputBus = bus => bus.forEach(auditInput)

export const enforceEqualLength = (...buses) => {
  const length = buses[0].length
  const isLengthEqual = buses.every(bus => bus.length === length)
  if (!isLengthEqual) {
    throw new Error('Buses are not of equal length.')
  }
}

export const enforceSelNumMeet = (sels, buses) => {
  const selNum = Math.pow(2, sels.length)
  if (buses.length !== selNum) {
    throw new Error('Number of selections should be equal to number of buses.')
  }
}

export const prefilledArray = (len, filling) => {
  if (typeof filling === 'number') auditInput(filling)
  else auditInputBus(filling)

  if (len <= 0) throw new RangeError('Bus should have length.')
  return (new Array(len)).fill(filling)
}

export const binary2Decimal = bus => {
  auditInputBus(bus)

  return bus.reverse().reduce((result, input, i) => {
    const increament = (input === 0) ? 0 : Math.pow(2, i)
    return result + increament
  }, 0)
}

export const nand = (busA, busB) => {
  enforceEqualLength(busA, busB)

  return busA.map((inputA, i) => {
    const inputB = busB[i]
    auditInput(inputA)
    auditInput(inputB)
    return inputA === 1 && inputB === 1 ? 0 : 1
  })
}

export const not = bus => nand(bus, prefilledArray(bus.length, 1))

export const and = (busA, busB) => {
  enforceEqualLength(busA, busB)

  return not(nand(busA, busB))
}

export const or = (...buses) => {
  enforceEqualLength(...buses)

  const result = prefilledArray(buses[0].length, 0)
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
  auditInputBus(sels)
  enforceEqualLength(buses)
  enforceSelNumMeet(sels, buses)

  const selectedIndx = binary2Decimal(sels)
  return buses[selectedIndx].slice()
}

export const dmux = (sels, bus) => {
  auditInputBus(sels)

  const defaultResult = prefilledArray(bus.length, 0)
  const resultNum = Math.pow(2, sels.length)
  const results = prefilledArray(resultNum, defaultResult)

  const selectedIndx = binary2Decimal(sels)
  results[selectedIndx] = bus.slice()

  return results
}
