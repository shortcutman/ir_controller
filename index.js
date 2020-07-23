const express = require('express')
const querystring = require('querystring')
const child_process = require('child_process')

const app = express()
app.use(express.urlencoded())

app.post('/raspotify', (request, response) => {
  console.log('Received player event:', request.body.PLAYER_EVENT)
  response.send('Received')

  switch (request.body.PLAYER_EVENT) {
    case 'start':
      console.log('turn on stereo')
      console.log('invalidate timer')

      child_process.exec('irsend send_once hk970.conf.conf poweron', (error, stdout, stderr) => {
        console.log('Error', error)
        console.log('stdout', stdout)
        console.log('stderr', stderr)
      })
      break;

    case 'stop':
      console.log('start stereo off timer')
      break;
  }
})

app.listen(8111, () => {
  console.log('Listening at :8111')
})