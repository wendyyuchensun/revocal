import assert from 'assert'
import { halfAdder } from '../src/alu.mjs'

// halfAdder
assert.deepEqual(halfAdder([0], [0]), { sum: [0], carry: [0] })
assert.deepEqual(halfAdder([0], [1]), { sum: [1], carry: [0] })
assert.deepEqual(halfAdder([1], [0]), { sum: [1], carry: [0] })
assert.deepEqual(halfAdder([1], [1]), { sum: [0], carry: [1] })
