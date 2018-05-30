import assert from './strictAssert.mjs'

import {
  auditInput,
  auditBus,
  enforceEqualLength,
  enforceSelNumMeet,
  prefilledArray,
  busOf0,
  busOf1,
  binary2Decimal,
  int0,
  int1,
  intMinus1,
  isInt0,
  negate
} from '../src/helpers.mjs'

// fixtures
const sampleBus1 = [0, 0]
const sampleBus2 = [1, 1]

const auditError = {
  name: 'TypeError',
  message: 'Only 0 or 1 allowed.'
}

const rangeError = {
  name: 'RangeError',
  message: 'Bus should have length.'
}

const lengthError = {
  message: 'Buses are not of equal length.'
}

const selectionError = {
  message: 'Number of selections should be equal to number of buses.'
}

// auditInput
assert.doesNotThrow(() => auditInput(0))
assert.doesNotThrow(() => auditInput(1))
assert.throws(() => auditInput(-1), auditError)

// auditBus
assert.doesNotThrow(() => auditBus(sampleBus1))
assert.throws(() => auditInput([0, 1, 2]), auditError)

// enforceEqualLength
assert.doesNotThrow(() => enforceEqualLength(sampleBus1, sampleBus2))
assert.throws(() => enforceEqualLength(sampleBus1, [0, 1, 2]), lengthError)

// enforceSelNumMeet
assert.doesNotThrow(() => enforceSelNumMeet([0, 1], [1, 0, 1, 1]))
assert.throws(() => enforceSelNumMeet([0, 1], [0, 1]), selectionError)

// prefilledArray
// single input
assert.deepEqual(prefilledArray(2, 1), [1, 1])
assert.throws(() => prefilledArray(2, 2), auditError)
assert.throws(() => prefilledArray(-1, 0), rangeError)
// multiple inputs
assert.deepEqual(prefilledArray(2, sampleBus1), [sampleBus1, sampleBus1])
assert.throws(() => prefilledArray(2, [1, -1]), auditError)
assert.throws(() => prefilledArray(-1, 0), rangeError)

// busOf0
assert.deepEqual(busOf0(2), [0, 0])

// busOf1
assert.deepEqual(busOf1(2), [1, 1])

// binary2Decimal
assert.equal(binary2Decimal([0]), 0)
assert.equal(binary2Decimal([1]), 1)
assert.equal(binary2Decimal([1, 0]), 2)
assert.equal(binary2Decimal([1, 1]), 3)
assert.equal(binary2Decimal([1, 0, 0]), 4)

// int0
assert.deepEqual(int0(1), [0])
assert.deepEqual(int0(2), [0, 0])
assert.deepEqual(int0(4), [0, 0, 0, 0])

// int1
assert.deepEqual(int1(1), [1])
assert.deepEqual(int1(2), [0, 1])
assert.deepEqual(int1(4), [0, 0, 0, 1])

// int1
assert.deepEqual(intMinus1(1), [1])
assert.deepEqual(intMinus1(2), [1, 1])
assert.deepEqual(intMinus1(4), [1, 1, 1, 1])

// isInt0
assert.deepEqual(isInt0([0]), true)
assert.deepEqual(isInt0([1]), false)
assert.deepEqual(isInt0([0, 0]), true)
assert.deepEqual(isInt0([1, 0]), false)
assert.deepEqual(isInt0([0, 1]), false)
assert.deepEqual(isInt0([1, 1]), false)

// negate
assert.deepEqual(negate([0]), [0])
assert.deepEqual(negate([1]), [1])
assert.deepEqual(negate([0, 0]), [0, 0])
assert.deepEqual(negate([0, 1]), [1, 1])
assert.deepEqual(negate([1, 0]), [1, 0])
assert.deepEqual(negate([1, 1]), [0, 1])
assert.deepEqual(negate([0, 0, 0]), [0, 0, 0])
assert.deepEqual(negate([0, 0, 1]), [1, 1, 1])
assert.deepEqual(negate([0, 1, 0]), [1, 1, 0])
assert.deepEqual(negate([0, 1, 1]), [1, 0, 1])
assert.deepEqual(negate([1, 0, 0]), [1, 0, 0])
assert.deepEqual(negate([1, 0, 1]), [0, 1, 1])
assert.deepEqual(negate([1, 1, 0]), [0, 1, 0])
assert.deepEqual(negate([1, 1, 1]), [0, 0, 1])
