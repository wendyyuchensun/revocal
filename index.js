const rootNode = document.querySelector('.root')

const events = [
  {
    title: 'take out garbage',
    time: '2018.5.7 21:35',
  },
  {
    title: 'cook dinner',
    time: '2018.5.6 19:30',
  },
]

const createTitleNode = (title) => {
  const divNode = document.createElement('div')
  divNode.setAttribute('class', 'title')

  const textNode = document.createTextNode(title)
  divNode.appendChild(textNode)

  return divNode
}

const createTimeNode = (time) => {
  const divNode = document.createElement('div')
  divNode.setAttribute('class', 'time')

  const textNode = document.createTextNode(time)
  divNode.appendChild(textNode)

  return divNode
}

const createEventNode = (eventData) => {
  const divNode = document.createElement('div')
  divNode.setAttribute('class', 'event')
  
  const titleNode = createTitleNode(eventData.title)
  const timeNode = createTimeNode(eventData.time)

  divNode.appendChild(titleNode)
  divNode.appendChild(timeNode)

  return divNode
}

events.forEach(eventData => {
  const eventNode = createEventNode(eventData)
  rootNode.appendChild(eventNode)
})
