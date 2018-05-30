import assert from './strictAssert.mjs'

import {
  add,
  inc1,
  alu
} from '../src/alu.mjs'

import {
  and,
  not,
  or
} from '../src/gates.mjs'

import {
  int0,
  int1,
  intMinus1,
  negate
} from '../src/helpers.mjs'

// add
assert.deepEqual(add([0], [0]), [0])
assert.deepEqual(add([0], [1]), [1])
assert.deepEqual(add([1], [0]), [1])
assert.deepEqual(add([1], [1]), [0])
assert.deepEqual(add([0, 0], [0, 0]), [0, 0])
assert.deepEqual(add([1, 0], [0, 0]), [1, 0])
assert.deepEqual(add([0, 1], [0, 0]), [0, 1])
assert.deepEqual(add([1, 1], [0, 0]), [1, 1])
assert.deepEqual(add([1, 1], [1, 0]), [0, 1])
assert.deepEqual(add([1, 1], [0, 1]), [0, 0])
assert.deepEqual(add([1, 1], [1, 1]), [1, 0])

// inc1
assert.deepEqual(inc1([0]), [1])
assert.deepEqual(inc1([0, 0]), [0, 1])
assert.deepEqual(inc1([1, 0]), [1, 1])
assert.deepEqual(inc1([0, 1]), [1, 0])
assert.deepEqual(inc1([1, 1]), [0, 0])

// alu
const x = [0, 0]
const y = [1, 1]

assert.deepEqual(alu(x, y, 1, 0, 1, 0, 1, 0), int0(x.length))
assert.deepEqual(alu(x, y, 1, 1, 1, 1, 1, 1), int1(x.length))
assert.deepEqual(alu(x, y, 1, 1, 1, 0, 1, 0), intMinus1(x.length))
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 0, 0), x)
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 0, 0), y)
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 0, 1), not(x))
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 0, 1), not(y))
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 1, 1), negate(x))
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 1, 1), negate(y))
assert.deepEqual(alu(x, y, 0, 1, 1, 1, 1, 1), inc1(x))
assert.deepEqual(alu(x, y, 1, 1, 0, 1, 1, 1), inc1(y))
assert.deepEqual(alu(x, y, 0, 0, 1, 1, 1, 0), add(x, negate(int1(x.length))))
assert.deepEqual(alu(x, y, 1, 1, 0, 0, 1, 0), add(y, negate(int1(y.length))))
assert.deepEqual(alu(x, y, 0, 0, 0, 0, 1, 0), add(x, y))
assert.deepEqual(alu(x, y, 0, 1, 0, 0, 1, 1), add(x, negate(y)))
assert.deepEqual(alu(x, y, 0, 0, 0, 1, 1, 1), add(y, negate(x)))
assert.deepEqual(alu(x, y, 0, 0, 0, 0, 0, 0), and(x, y))
assert.deepEqual(alu(x, y, 0, 1, 0, 1, 0, 1), or(x, y))
