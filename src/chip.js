const chip = on => {
  const div = document.createElement('div')
  div.classList.add('chip')

  let content = on ? '1' : '0'
  div.appendChild(document.createTextNode(content))

  return div
}
