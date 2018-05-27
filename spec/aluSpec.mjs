import assert from 'assert'
import {
  halfAdder,
  fullAdder,
  add,
  inc
} from '../src/alu.mjs'

// halfAdder
assert.deepEqual(halfAdder([0], [0]), { sum: [0], carry: [0] })
assert.deepEqual(halfAdder([0], [1]), { sum: [1], carry: [0] })
assert.deepEqual(halfAdder([1], [0]), { sum: [1], carry: [0] })

// fullAdder
assert.deepEqual(fullAdder([0], [0], [0]), { sum: [0], carry: [0] })
assert.deepEqual(fullAdder([0], [0], [1]), { sum: [1], carry: [0] })
assert.deepEqual(fullAdder([0], [1], [0]), { sum: [1], carry: [0] })
assert.deepEqual(fullAdder([0], [1], [1]), { sum: [0], carry: [1] })
assert.deepEqual(fullAdder([1], [0], [0]), { sum: [1], carry: [0] })
assert.deepEqual(fullAdder([1], [0], [1]), { sum: [0], carry: [1] })
assert.deepEqual(fullAdder([1], [1], [0]), { sum: [0], carry: [1] })
assert.deepEqual(fullAdder([1], [1], [1]), { sum: [1], carry: [1] })

// add
assert.deepEqual(add([1, 1], [1, 1]), [1, 0])
assert.deepEqual(add([1, 1, 0], [1, 1, 1]), [1, 0, 1])

// inc
assert.deepEqual(inc([1, 1]), [0, 0])
assert.deepEqual(inc([1, 1, 0]), [1, 1, 1])
