const sanityCheck = input => {
  if (input !== 0 && input !== 1) throw new Error('Input should be 0 or 1.');
}

const nand = (a, b) => {
  sanityCheck(a)
  sanityCheck(b)

  if (!a || !b) return 1;
  return 0;
}

const not = input => nand(input, 1)

const and = (a, b) => not(nand(a, b))

const or = (a, b) => nand(nand(a, a), nand(b, b))

const xor = (a, b) => {
  const c = nand(a, b)
  return nand(nand(a, c), nand(b, c))
}

const mux = (a, b, sel) => and(a, not(sel)) || and(b, sel)

const dmux = (input, sel) => ({
  a: and(input, not(sel)),
  b: and(input, sel),
})

if (typeof module !== 'undefined') module.exports = {
  nand,
  not,
  and,
  or,
  xor,
  mux,
  dmux,
}
