const nand = (a, b) => {
  if (!a || !b) return 1;
  return 0;
}

const chip = document.createElement('div')
chip.classList.add('chip')
if (nand(0, 0)) chip.classList.add('on')
document.querySelector('.root').appendChild(chip)
