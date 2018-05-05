const sampleEvent = { title: 'write code' }


ReactDOM.render(
  React.createElement('div', null, sampleEvent.title),
  document.querySelector('.root'),
)
