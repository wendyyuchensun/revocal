import assert from 'assert'
import {
  add,
  inc1
} from '../src/alu.mjs'

// add
assert.deepEqual(add([1, 1], [1, 1]), [0, 1])
assert.deepEqual(add([1, 1, 0], [1, 1, 1]), [0, 1, 0])

// inc1
assert.deepEqual(inc1([1, 1]), [0, 0])
assert.deepEqual(inc1([1, 1, 0]), [0, 0, 1])
