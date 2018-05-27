const http = require('http')
const path = require('path')
const parse = require('url').parse
const fs = require('fs')
const PORT = 3000

const requestHandler = (request, response) => {
  const filePath = parse(request.url).pathname
  if (filePath === '/favicon.ico') {
    response.writeHead(200)
    response.end()
    return
  }

  fs.readFile(path.join(__dirname, filePath), 'utf8', (err, data) => {
    if (err) console.log(err)
    if (filePath.endsWith('.mjs')) response.setHeader('Content-Type', 'text/javascript')
    if (filePath.endsWith('.css')) response.setHeader('Content-Type', 'text/css')
    response.end(data)
  })
}

const server = http.createServer(requestHandler)

server.listen(PORT, err => {
  if (err) console.log(`Error: ${err}`)
  console.log(`Dev server is running on ${PORT}.`)
})
