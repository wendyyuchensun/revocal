const nand = require('../src/gates')

if (nand(0, 0) !== 1) console.log('Failed')
if (nand(0, 1) !== 1) console.log('Failed')
if (nand(1, 0) !== 1) console.log('Failed')
if (nand(1, 1) !== 0) console.log('Failed')

console.log('Test completed.')
