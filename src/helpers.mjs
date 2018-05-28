export const auditInput = input => {
  if (input !== 0 && input !== 1) throw new TypeError('Only 0 or 1 allowed.')
}

export const auditBus = bus => bus.forEach(auditInput)

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
  auditInput(filling)
  if (len <= 0) throw new RangeError('Bus should have length.')
  return (new Array(len)).fill(filling)
}

export const binary2Decimal = bus => {
  auditBus(bus)
  return bus.reverse().reduce((result, input, i) => {
    const increament = (input === 0) ? 0 : Math.pow(2, i)
    return result + increament
  }, 0)
}

