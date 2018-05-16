const assert = require('assert').strict
const gates = require('../src/gates')

const {
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
} = gates

// fixtures
const sampleBus1 = [0, 0]
const sampleBus2 = [1, 1]
const sampleBus3 = [0, 1]
const sampleBus4 = [1, 0]

const auditError = {
  name: 'TypeError',
  message: 'Only 0 or 1 allowed.',
}

const rangeError = {
  name: 'RangeError',
  message: 'Bus should have length.',
}

// auditBit
assert.doesNotThrow(() => auditBit(0))
assert.doesNotThrow(() => auditBit(1))
assert.throws(() => auditBit(-1), auditError)

// auditBits
assert.doesNotThrow(() => auditBits(sampleBus1))
assert.throws(() => auditBit([0, 1, 2]), auditError)

// prefilledArray
// single bit
assert.deepEqual(prefilledArray(2, 1), [1, 1])
assert.throws(() => prefilledArray(2, 2), auditError)
assert.throws(() => prefilledArray(-1, 0), rangeError)
// multiple bits
assert.deepEqual(prefilledArray(2, sampleBus1), [sampleBus1, sampleBus1])
assert.throws(() => prefilledArray(2, [1, -1]), auditError)
assert.throws(() => prefilledArray(-1, 0), rangeError)

// binary2Decimal
assert.equal(binary2Decimal([0]), 0)
assert.equal(binary2Decimal([1]), 1)
assert.equal(binary2Decimal([1, 0]), 2)
assert.equal(binary2Decimal([1, 1]), 3)
assert.equal(binary2Decimal([1, 0, 0]), 4)

// nand
assert.deepEqual(nand(sampleBus1, sampleBus2), [1, 1])

// not
assert.deepEqual(not(sampleBus1), [1, 1])
assert.deepEqual(not(sampleBus2), [0, 0])

// and
assert.deepEqual(and(sampleBus1, sampleBus2), [0, 0])

// or
assert.deepEqual(or(sampleBus1, sampleBus2), [1, 1])

// xor
assert.deepEqual(xor(sampleBus1, sampleBus2), [1, 1])

// mux
assert.deepEqual(mux([0], sampleBus1, sampleBus2), [0, 0])
assert.deepEqual(mux([1], sampleBus1, sampleBus2), [1, 1])
assert.deepEqual(mux([0, 0], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [0, 0])
assert.deepEqual(mux([0, 1], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [1, 1])
assert.deepEqual(mux([1, 0], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [0, 1])
assert.deepEqual(mux([1, 1], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [1, 0])

// dmux
assert.deepEqual(dmux([0], sampleBus3), [[0, 1], [0, 0]])
assert.deepEqual(dmux([1], sampleBus3), [[0, 0], [0, 1]])
assert.deepEqual(dmux([0, 0], sampleBus3), [[0, 1], [0, 0], [0, 0], [0, 0]])
assert.deepEqual(dmux([0, 1], sampleBus3), [[0, 0], [0, 1], [0, 0], [0, 0]])
assert.deepEqual(dmux([1, 0], sampleBus3), [[0, 0], [0, 0], [0, 1], [0, 0]])
assert.deepEqual(dmux([1, 1], sampleBus3), [[0, 0], [0, 0], [0, 0], [0, 1]])
