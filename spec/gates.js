const gates = require('../src/gates')
const { nand, not, and, or, xor, mux, dmux } = gates

if (nand(0, 0) !== 1) console.log('Failed')
if (nand(0, 1) !== 1) console.log('Failed')
if (nand(1, 0) !== 1) console.log('Failed')
if (nand(1, 1) !== 0) console.log('Failed')

if (not(1) !== 0) console.log('Failed')
if (not(0) !== 1) console.log('Failed')

if (and(0, 0) !== 0) console.log('Failed')
if (and(0, 1) !== 0) console.log('Failed')
if (and(1, 0) !== 0) console.log('Failed')
if (and(1, 1) !== 1) console.log('Failed')

if (or(0, 0) !== 0) console.log('Failed')
if (or(0, 1) !== 1) console.log('Failed')
if (or(1, 0) !== 1) console.log('Failed')
if (or(1, 1) !== 1) console.log('Failed')

if (xor(0, 0) !== 0) console.log('Failed')
if (xor(0, 1) !== 1) console.log('Failed')
if (xor(1, 0) !== 1) console.log('Failed')
if (xor(1, 1) !== 0) console.log('Failed')

if (mux(0, 0, 0) !== 0) console.log('Failed')
if (mux(0, 1, 0) !== 0) console.log('Failed')
if (mux(1, 0, 0) !== 1) console.log('Failed')
if (mux(1, 1, 0) !== 1) console.log('Failed')
if (mux(0, 0, 1) !== 0) console.log('Failed')
if (mux(0, 1, 1) !== 1) console.log('Failed')
if (mux(1, 0, 1) !== 0) console.log('Failed')
if (mux(1, 1, 1) !== 1) console.log('Failed')

if (dmux(1, 0).a !== 1 || dmux(1, 0).b !== 0) console.log('Failed')
if (dmux(1, 1).a !== 0 || dmux(1, 1).b !== 1) console.log('Failed')
if (dmux(0, 0).a !== 0 || dmux(0, 0).b !== 0) console.log('Failed')
if (dmux(0, 1).a !== 0 || dmux(0, 1).b !== 0) console.log('Failed')

console.log('Test completed.')
