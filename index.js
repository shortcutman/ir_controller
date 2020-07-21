const express = require('express')
const querystring = require('querystring')

const app = express()
app.use(express.urlencoded())

app.post('/raspotify', (request, response) => {
  console.log(request.body)
  response.send('Received')
})

app.listen(8111, () => {
  console.log('Listening at :8111')
})