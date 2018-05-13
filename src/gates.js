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

const dmux = (input, sel) => [
  and(input, not(sel)),
  and(input, sel),
]

const multiBitsNot = bus => bus.map(not)

const multiBitsAnd = (aBus, bBus) => aBus.map((a, i) => and(a, bBus[i]))

const multiBitsOr = (aBus, bBus) => aBus.map((a, i) => or(a, bBus[i]))

const multiBitsMux = (aBus, bBus, sel) => aBus.map((a, i) => mux(a, bBus[i]))

const orMultiWay = bus => bus.reduce((result, bit) => or(result, bit))

const multiBitsMux4Way = (bus1, bus2, bus3, bus4, sel1, sel2) => multiBitsMux(
  multiBitsMux(bus1, bus2, sel2),
  multiBitsMux(bus3, bus4, sel2),
  sel1,
)

const multiBitsMux8Way = (
  bus1, bus2, bus3, bus4, bus5, bus6, bus7, bus8,
  sel1, sel2, sel3,
) => multiBitsMux(
  multiBitsMux4Way(bus1, bus2, bus3, bus4, sel2, sel3),
  multiBitsMux4Way(bus5, bus6, bus7, bus8, sel2, sel3),
  sel1,
)

const dmux4way = (input, sel1, sel2) => dmux(input, sel1).reduce((r, i) => {
  r = r.concat(dmux(i, sel2))
  return r
}, [])

const dmux8way = (input, sel1, sel2, sel3) => dmux(input, sel1).reduce((r, i) => {
  r = r.concat(dmux4Way(i, sel2, sel3))
  return r
}, [])

if (typeof module !== 'undefined') module.exports = {
  nand,
  not,
  and,
  or,
  xor,
  mux,
  dmux,
  multiBitsNot,
  multiBitsAnd,
  multiBitsOr,
  multiBitsMux,
  orMultiWay,
  multiBitsMux4Way,
  multiBitsMux8Way,
}
