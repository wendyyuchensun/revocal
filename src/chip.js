const chip = on => {
  const div = document.createElement('div')
  div.classList.add('chip')
  if (on) div.classList.add('on')
  document.querySelector('.app').appendChild(div)
}
