const nandSection = document.querySelector('.nand .section-body')
nandSection.appendChild(chip(nand([0], [0])))

const notSection = document.querySelector('.not .section-body')
notSection.appendChild(chip(not([0])))

const andSection = document.querySelector('.and .section-body')
andSection.appendChild(chip(and([0], [0])))

const orSection = document.querySelector('.or .section-body')
orSection.appendChild(chip(or([0], [1])))

const xorSection = document.querySelector('.xor .section-body')
xorSection.appendChild(chip(xor([1], [1])))

const muxSection = document.querySelector('.mux .section-body')
muxSection.appendChild(chip(mux([1], [0], [0])))

const dmuxSection = document.querySelector('.dmux .section-body')
dmux([1, 0], [0]).forEach(i => dmuxSection.appendChild(chip(i)))
