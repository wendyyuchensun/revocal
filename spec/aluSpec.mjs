import assert from 'assert'
import {
  one,
  add,
  inc1
} from '../src/alu.mjs'

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
