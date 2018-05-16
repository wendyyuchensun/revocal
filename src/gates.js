const auditBit = bit => {
  if (bit !== 0 && bit !== 1) {
    throw new TypeError('Only 0 or 1 allowed.')
  }
}

const auditBits = bus => bus.forEach(auditBit)

const enforceEqualLength = (...buses) => {
  const length = buses[0].length
  const isLengthEqual = buses.every(bus => bus.length === length)
  if (!isLengthEqual) {
    throw new Error('Buses are not of equal length.')
  }
}

const enforceSelNumMeet = (sels, buses) => {
  const selNum = Math.pow(2, sels.length)
  if (buses.length !== selNum) {
    throw new Error('Number of selections should be equal to number of buses.')
  }
}

const prefilledArray = (len, filling) => {
  if (typeof filling === 'number') auditBit(filling)
  else auditBits(filling) 

  if (len <= 0) throw new RangeError('Bus should have length.')
  return (new Array(len)).fill(filling)
}

const binary2Decimal = bus => {
  auditBits(bus)

  return bus.reverse().reduce((result, bit, i) => {
    const increament = (bit === 0) ? 0 : Math.pow(2, i)
    return result + increament
  }, 0)
}

const nand = (busA, busB) => {
  enforceEqualLength(busA, busB)

  return busA.map((bitA, i) => {
    const bitB = busB[i]
    auditBit(bitA)
    auditBit(bitB)
    return bitA === 1 && bitB === 1 ? 0 : 1
  })
}

const not = bus => nand(bus, prefilledArray(bus.length, 1))

const and = (busA, busB) => {
  enforceEqualLength(busA, busB)

  return not(nand(busA, busB))
}

const or = (...buses) => {
  enforceEqualLength(...buses)

  const result = prefilledArray(buses[0].length, 0)
  return buses.reduce((busA, busB) => {
    const busC = nand(busA, busB)
    return nand(nand(busA, busC), nand(busB, busC))
  }, result)
}

const xor = (busA, busB) => {
  enforceEqualLength(busA, busB)

  const busC = nand(busA, busB)
  return nand(nand(busA, busC), nand(busB, busC))
}

const mux = (sels, ...buses) => {
  auditBits(sels)      
  enforceEqualLength(buses)
  enforceSelNumMeet(sels, buses)

  const selectedIndx = binary2Decimal(sels)
  return buses[selectedIndx]
}

const dmux = (sels, bus) => {
  auditBits(sels)      

  const defaultResult = prefilledArray(bus.length, 0)
  const resultNum = Math.pow(2, sels.length)
  const results = prefilledArray(resultNum, defaultResult)

  const selectedIndx = binary2Decimal(sels)
  results[selectedIndx] = bus.slice()

  return results
}

if (typeof module !== 'undefined') module.exports = {
  auditBit,
  auditBits,
  enforceEqualLength,
  enforceSelNumMeet,
  prefilledArray,
  binary2Decimal,
  nand,
  not,
  and,
  or,
  xor,
  mux,
  dmux,
}
