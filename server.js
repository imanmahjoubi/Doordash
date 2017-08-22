var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var shortid = require('shortid')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

var router = express.Router()

// Unsafely enable cors
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// logging middleware
router.use(function (req, res, next) {
  console.log('\nReceived:', { url: req.originalUrl, body: req.body, query: req.query })
  next()
})

// Simple in memory database
const database = [
  { name: 'Analytics', id: 2, users: ['Ryan', 'Nick'], messages: [{ name: 'Ryan', message: 'ayyyyy', id: 'gg35545', reaction: null }, { name: 'Nick', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', id: 'yy35578', reaction: null }] },
  { name: 'Business', id: 3, users: [], messages: [] },
  { name: 'Coffee Chats', id: 1, users: ['Abdul'], messages: [{ name: 'Abdul', message: 'ayy', id: 'ff35278', reaction: null }] },
  { name: 'Tea Chats', id: 0, users: ['Ryan', 'Nick'], messages: [{ name: 'Ryan', message: 'ayyyyy', id: 'ggg456', reaction: null }, { name: 'Nick', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', id: 'yy35789', reaction: null }] },
  { name: 'Design', id: 4, users: [], messages: [] },
  { name: 'Engineering', id: 5, users: [], messages: [] },
  { name: 'HR', id: 5, users: [], messages: [] },
  { name: 'Operations', id: 6, users: [], messages: [] }
]


// Utility functions
const findRoom = (roomId) => {
  const room = database.find((room) => {
    return room.id === parseInt(roomId)
  })
  if (room === undefined) {
    return { error: `a room with id ${roomId} does not exist` }
  }
  return room
}

const findRoomIndex = (roomId) => {
  const roomIndex = database.findIndex((room) => {
    return room.id === parseInt(roomId)
  })
  return roomIndex
}

const findMessageIndex = (room, messageId) => {
  const messageIndex = room.messages.findIndex((message) => {
    return message.id === messageId
  })
  return messageIndex
}

const logUser = (room, username) => {
  const userNotLogged = !room.users.find((user) => {
    return user === username
  })

  if (userNotLogged) {
    room.users.push(username)
  }
}

// API Routes
router.get('/rooms', function (req, res) {
  const rooms = database.map((room) => {
    return { name: room.name, id: room.id }
  })
  console.log('Response:', rooms)
  res.json(rooms)
})

router.get('/rooms/:roomId', function (req, res) {
  room = findRoom(req.params.roomId)
  if (room.error) {
    console.log('Response:', room)
    res.json(room)
  } else {
    console.log('Response:', { name: room.name, id: room.id, users: room.users })
    res.json({ name: room.name, id: room.id, users: room.users })
  }
})

router.route('/rooms/:roomId/messages')
  .get(function (req, res) {
    room = findRoom(req.params.roomId)
    if (room.error) {
      console.log('Response:', room)
      res.json(room)
    } else {
      console.log('Response:', room.messages)
      res.json(room.messages)
    }
  })
  .post(function (req, res) {
    room = findRoom(req.params.roomId)
    if (room.error) {
      console.log('Response:', room)
      res.json(room)
    } else if (!req.body.name || !req.body.message) {
      console.log('Response:', { error: 'request missing name or message' })
      res.json({ error: 'request missing name or message' })
    } else {
      logUser(room, req.body.name)
      const reaction = req.body.reaction || null
      room.messages.push({ name: req.body.name, message: req.body.message, id: shortid.generate(), reaction })
      console.log('Response:', { message: 'OK!' })
      res.json({ message: 'OK!' })
    }
  })

app.use('/api', router)
app.listen(port)
console.log(`API running at localhost:${port}/api`)
