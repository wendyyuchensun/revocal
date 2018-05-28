import assert from './strictAssert.mjs'

import {
  nand,
  not,
  and,
  or,
  xor,
  mux,
  dmux
} from '../src/gates.mjs'

// fixtures
const sampleBus1 = [0, 0]
const sampleBus2 = [1, 1]
const sampleBus3 = [0, 1]
const sampleBus4 = [1, 0]

// nand
assert.deepEqual(nand([0], [0]), [1])
assert.deepEqual(nand([0], [1]), [1])
assert.deepEqual(nand([1], [0]), [1])
assert.deepEqual(nand([1], [1]), [0])
assert.deepEqual(nand(sampleBus1, sampleBus2), [1, 1])

// not
assert.deepEqual(not([0]), [1])
assert.deepEqual(not([1]), [0])
assert.deepEqual(not(sampleBus1), [1, 1])
assert.deepEqual(not(sampleBus2), [0, 0])

// and
assert.deepEqual(and([0], [0]), [0])
assert.deepEqual(and([0], [1]), [0])
assert.deepEqual(and([1], [0]), [0])
assert.deepEqual(and([1], [1]), [1])
assert.deepEqual(and(sampleBus1, sampleBus2), [0, 0])

// or
assert.deepEqual(or([0], [0]), [0])
assert.deepEqual(or([0], [1]), [1])
assert.deepEqual(or([1], [0]), [1])
assert.deepEqual(or([1], [1]), [1])
assert.deepEqual(or(sampleBus1, sampleBus2), [1, 1])

// xor
assert.deepEqual(xor([0], [0]), [0])
assert.deepEqual(xor([0], [1]), [1])
assert.deepEqual(xor([1], [0]), [1])
assert.deepEqual(xor([1], [1]), [0])
assert.deepEqual(xor(sampleBus1, sampleBus2), [1, 1])

// mux
assert.deepEqual(mux([0], [0], [0]), [0])
assert.deepEqual(mux([0], [0], [1]), [0])
assert.deepEqual(mux([0], [1], [0]), [1])
assert.deepEqual(mux([0], [1], [1]), [1])
assert.deepEqual(mux([1], [0], [0]), [0])
assert.deepEqual(mux([1], [0], [1]), [1])
assert.deepEqual(mux([1], [1], [0]), [0])
assert.deepEqual(mux([1], [1], [1]), [1])
assert.deepEqual(mux([0], sampleBus1, sampleBus2), [0, 0])
assert.deepEqual(mux([1], sampleBus1, sampleBus2), [1, 1])
assert.deepEqual(mux([0, 0], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [0, 0])
assert.deepEqual(mux([0, 1], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [1, 1])
assert.deepEqual(mux([1, 0], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [0, 1])
assert.deepEqual(mux([1, 1], sampleBus1, sampleBus2, sampleBus3, sampleBus4), [1, 0])

// dmux
assert.deepEqual(dmux([0], [0]), [[0], [0]])
assert.deepEqual(dmux([0], [1]), [[1], [0]])
assert.deepEqual(dmux([1], [0]), [[0], [0]])
assert.deepEqual(dmux([1], [1]), [[0], [1]])
assert.deepEqual(dmux([1], sampleBus3), [[0, 0], [0, 1]])
assert.deepEqual(dmux([0], sampleBus3), [[0, 1], [0, 0]])
assert.deepEqual(dmux([1], sampleBus3), [[0, 0], [0, 1]])
assert.deepEqual(dmux([0, 0], sampleBus3), [[0, 1], [0, 0], [0, 0], [0, 0]])
assert.deepEqual(dmux([0, 1], sampleBus3), [[0, 0], [0, 1], [0, 0], [0, 0]])
assert.deepEqual(dmux([1, 0], sampleBus3), [[0, 0], [0, 0], [0, 1], [0, 0]])
assert.deepEqual(dmux([1, 1], sampleBus3), [[0, 0], [0, 0], [0, 0], [0, 1]])
