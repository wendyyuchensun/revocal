import {
  and,
  xor
} from './gates'

export const halfAdder = (bitA, bitB) => ({
  sum: xor(bitA, bitB),
  carry: and(bitA, bitB)
})
