const auditBit = bit => {
  if (bit !== 0 && bit !== 1) {
    throw new TypeError('Only 0 or 1 allowed.')
  }
}

const auditBits = bits => bits.forEach(auditBit)

const prefilledArray = (len, filling) => {
  if (typeof filling === 'number') auditBit(filling)
  else auditBits(filling) 

  if (len <= 0) throw new RangeError('Bus should have length.')
  return (new Array(len)).fill(filling)
}

const binary2Decimal = bits => {
  auditBits(bits)
  return bits.reverse().reduce((result, bit, i) => {
    const increament = (bit === 0) ? 0 : Math.pow(2, i)
    return result + increament
  }, 0)
}

const nand = (busA, busB) => {
  return busA.map((bitA, i) => {
    const bitB = busB[i]
    auditBit(bitA)
    auditBit(bitB)
    return bitA === 1 && bitB === 1 ? 0 : 1
  })
}

const not = bus => nand(bus, prefilledArray(bus.length, 1))

const and = (busA, busB) => not(nand(busA, busB))

const or = (...buses) => {
  const result = prefilledArray(buses[0].length, 0)

  return buses.reduce((busA, busB) => {
    const busC = nand(busA, busB)
    return nand(nand(busA, busC), nand(busB, busC))
  }, result)
}

const xor = (busA, busB) => {
  const busC = nand(busA, busB)
  return nand(nand(busA, busC), nand(busB, busC))
}

// I'm cheating here by not using gates previously built.
const mux = (sels, ...buses) => {
  auditBits(sels)      
  const selectedIndx = binary2Decimal(sels)
  return buses[selectedIndx]
}

// Cheating here as well. See comment above.
const dmux = (sels, bus) => {
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
