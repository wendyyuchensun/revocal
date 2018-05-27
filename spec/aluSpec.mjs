import assert from 'assert'

import alu, {
  zero,
  one,
  add,
  inc1,
  negate
} from '../src/alu.mjs'

import {
  and,
  not,
  or
} from '../src/gates.mjs'

// zero
assert.deepEqual(zero(1), [0])
assert.deepEqual(zero(2), [0, 0])

// one
assert.deepEqual(one(1), [1])
assert.deepEqual(one(2), [1, 0])
assert.deepEqual(one(4), [1, 0, 0, 0])

// add
assert.deepEqual(add([0], [0]), [0])
assert.deepEqual(add([0], [1]), [1])
assert.deepEqual(add([1], [0]), [1])
assert.deepEqual(add([1], [1]), [0])
assert.deepEqual(add([0, 0], [0, 0]), [0, 0])
assert.deepEqual(add([1, 0], [0, 0]), [1, 0])
assert.deepEqual(add([0, 1], [0, 0]), [0, 1])
assert.deepEqual(add([1, 1], [0, 0]), [1, 1])
assert.deepEqual(add([1, 1], [1, 0]), [0, 0])
assert.deepEqual(add([1, 1], [0, 1]), [1, 0])
assert.deepEqual(add([1, 1], [1, 1]), [0, 1])

// inc1
assert.deepEqual(inc1([0]), [1])
assert.deepEqual(inc1([0, 0]), [1, 0])
assert.deepEqual(inc1([1, 0]), [0, 1])
assert.deepEqual(inc1([0, 1]), [1, 1])
assert.deepEqual(inc1([1, 1]), [0, 0])

// negate
assert.deepEqual(negate([0, 0]), [0, 0])
assert.deepEqual(negate([0, 1]), [0, 1])
assert.deepEqual(negate([1, 0]), [1, 1])
assert.deepEqual(negate([1, 1]), [1, 0])

// alu
const x = [0]
const y = [0]

assert.deepEqual(alu(x, y, 1, 0, 1, 0, 1, 0), [0])
assert.deepEqual(alu(x, y, 1, 1, 1, 1, 1, 1), [1])
assert.deepEqual(alu(x, y, 1, 1, 1, 0, 1, 0), [1])
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 0, 0), x)
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 0, 0), y)
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 0, 1), not(x))
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 0, 1), not(y))
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 1, 1), negate(x))
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 1, 1), negate(y))
assert.deepEqual(alu(x, y, 0, 1, 1, 1, 1, 1), inc1(x))
assert.deepEqual(alu(x, y, 1, 1, 0, 1, 1, 1), inc1(y))
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 1, 0), add(x, negate(one([x.length]))))
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 1, 0), add(y, negate(one([y.length]))))
assert.deepEqual(alu(x, y, 0, 0, 0, 0, 1, 0), add(x, y))
assert.deepEqual(alu(x, y, 0, 1, 0, 0, 1, 1), add(x, negate(y)))
assert.deepEqual(alu(x, y, 0, 0, 0, 0, 0, 0), and(x, y))
assert.deepEqual(alu(x, y, 0, 1, 0, 1, 0, 1), or(x, y))
