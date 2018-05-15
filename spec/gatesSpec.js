const assert = require('assert').strict
const gates = require('../src/gates')

const { nand, not, and, or, xor, mux, dmux } = gates

// nand
assert.equal(nand(0, 0), 1)
assert.equal(nand(0, 1), 1)
assert.equal(nand(1, 0), 1)
assert.equal(nand(1, 1), 0)

// not
assert.equal(not(1), 0)
assert.equal(not(0), 1)

// and
assert.equal(and(0, 0), 0)
assert.equal(and(0, 1), 0)
assert.equal(and(1, 0), 0)
assert.equal(and(1, 1), 1)

// or
assert.equal(or(0, 0), 0)
assert.equal(or(0, 1), 1)
assert.equal(or(1, 0), 1)
assert.equal(or(1, 1), 1)

// xor
assert.equal(xor(0, 0), 0)
assert.equal(xor(0, 1), 1)
assert.equal(xor(1, 0), 1)
assert.equal(xor(1, 1), 0)

// mux
assert.equal(mux(0, 0, 0), 0)
assert.equal(mux(0, 1, 0), 0)
assert.equal(mux(1, 0, 0), 1)
assert.equal(mux(1, 1, 0), 1)
assert.equal(mux(0, 0, 1), 0)
assert.equal(mux(0, 1, 1), 1)
assert.equal(mux(1, 0, 1), 0)
assert.equal(mux(1, 1, 1), 1)
