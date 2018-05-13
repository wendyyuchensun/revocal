const nandSection = document.querySelector('.nand .section-body')
nandSection.appendChild(chip(nand(0, 0)))
nandSection.appendChild(chip(nand(0, 1)))
nandSection.appendChild(chip(nand(1, 0)))
nandSection.appendChild(chip(nand(1, 1)))

const notSection = document.querySelector('.not .section-body')
notSection.appendChild(chip(not(0)))
notSection.appendChild(chip(not(1)))

const andSection = document.querySelector('.and .section-body')
andSection.appendChild(chip(and(0, 0)))
andSection.appendChild(chip(and(0, 1)))
andSection.appendChild(chip(and(1, 0)))
andSection.appendChild(chip(and(1, 1)))

const orSection = document.querySelector('.or .section-body')
orSection.appendChild(chip(or(0, 0)))
orSection.appendChild(chip(or(0, 1)))
orSection.appendChild(chip(or(1, 0)))
orSection.appendChild(chip(or(1, 1)))

const xorSection = document.querySelector('.xor .section-body')
xorSection.appendChild(chip(xor(0, 0)))
xorSection.appendChild(chip(xor(0, 1)))
xorSection.appendChild(chip(xor(1, 0)))
xorSection.appendChild(chip(xor(1, 1)))

const muxSection = document.querySelector('.mux .section-body')
muxSection.appendChild(chip(mux(0, 0, 0)))
muxSection.appendChild(chip(mux(0, 1, 0)))
muxSection.appendChild(chip(mux(1, 0, 0)))
muxSection.appendChild(chip(mux(1, 1, 0)))
muxSection.appendChild(chip(mux(0, 0, 1)))
muxSection.appendChild(chip(mux(0, 1, 1)))
muxSection.appendChild(chip(mux(1, 0, 1)))
muxSection.appendChild(chip(mux(1, 1, 1)))

const dmuxSection = document.querySelector('.dmux .section-body')
dmux(0, 0).forEach(i => dmuxSection.appendChild(chip(i)))
dmux(0, 1).forEach(i => dmuxSection.appendChild(chip(i)))
dmux(1, 0).forEach(i => dmuxSection.appendChild(chip(i)))
dmux(1, 1).forEach(i => dmuxSection.appendChild(chip(i)))

const sampleByte1 = [
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
  0, 1, 
]

const sampleByte2 = [
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
  1, 0,
]

const sampleByte3 = [
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
]

const sampleByte4 = [
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 0,
  0, 1,
]

const sampleByte5 = [
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
]

const sampleByte6 = [
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
]

const sampleByte7 = [
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  0, 0,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
  1, 1,
]

const sampleByte8 = [
  1, 1,
  0, 0,
  1, 1,
  0, 0,
  1, 1,
  0, 0,
  1, 1,
  0, 0,
  1, 1,
  0, 0,
  1, 1,
  0, 0,
  1, 1,
  0, 0,
  1, 1,
  0, 0,
  1, 1,
  0, 0,
]

const multiBitsNotSection = document.querySelector('.multi-bits-not .section-body')
multiBitsNot(sampleByte1).forEach(bit => multiBitsNotSection.appendChild(chip(bit)))

const multiBitsAndSection = document.querySelector('.multi-bits-and .section-body')
multiBitsAnd(sampleByte1, sampleByte2).forEach(bit => multiBitsAndSection.appendChild(chip(bit)))

const multiBitsOrSection = document.querySelector('.multi-bits-or .section-body')
multiBitsOr(sampleByte1, sampleByte2).forEach(bit => multiBitsOrSection.appendChild(chip(bit)))

const multiBitsMuxSection = document.querySelector('.multi-bits-mux .section-body')
multiBitsMux(sampleByte1, sampleByte2, 0).forEach(bit => multiBitsMuxSection.appendChild(chip(bit)))

const orMultiWaysSection = document.querySelector('.or-multi-ways .section-body')
orMultiWaysSection.appendChild(chip(orMultiWays(sampleByte1)))

const multiBitsMux4WaysSection = document.querySelector('.multi-bits-mux-4-ways .section-body')
multiBitsMux4Ways(sampleByte1, sampleByte2, sampleByte3, sampleByte4, 1, 1).forEach(bit => {
  multiBitsMux4WaysSection.appendChild(chip(bit))
})

const multiBitsMux8WaysSection = document.querySelector('.multi-bits-mux-8-ways .section-body')
multiBitsMux8Ways(
  sampleByte1, sampleByte2, sampleByte3, sampleByte4,
  sampleByte5, sampleByte6, sampleByte7, sampleByte8,
  0, 1, 1,
).forEach(bit => {
  multiBitsMux8WaysSection.appendChild(chip(bit))
})

const dmux4WaysSection = document.querySelector('.dmux-4-ways .section-body')
dmux4Ways(0, 0, 1).forEach(i => dmux4WaysSection.appendChild(chip(i)))

const dmux8WaysSection = document.querySelector('.dmux-8-ways .section-body')
dmux8Ways(1, 0, 1, 0).forEach(i => dmux8WaysSection.appendChild(chip(i)))
