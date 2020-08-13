const express = require('express')
const querystring = require('querystring')
const child_process = require('child_process')

const app = express()
app.use(express.urlencoded())

var timeout;

function runIRCommand(command) {
  const fullCommand = 'irsend send_once hk970.conf.conf ' + command
  child_process.exec(fullCommand, (error, stdout, stderr) => {
    console.log('Error', error)
    console.log('stdout', stdout)
    console.log('stderr', stderr)
  })
}

app.post('/raspotify', (request, response) => {
  console.log('Received player event:', request.body.PLAYER_EVENT)
  response.send('Received')

  switch (request.body.PLAYER_EVENT) {
    case 'start':
      console.log('turn on stereo')
      runIRCommand('poweron')
      console.log('invalidate timer')
      clearTimeout(timeout)
      break;

    case 'stop':
      console.log('start stereo off timer')

      timeout = setTimeout(() => {
        runIRCommand('poweroff')
      }, 60000)
      break;
  }
})

app.get('/volumeup', (request, response) => {
  console.log('turn volume up')
  runIRCommand('volumeup')
})

app.get('/volumedown', (request, response) => {
  console.log('turn volume down')
  runIRCommand('volumedown')
})

app.listen(8111, () => {
  console.log('Listening at :8111')
})