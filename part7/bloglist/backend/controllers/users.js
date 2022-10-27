const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author:1, id: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  const errorPassBase = 'User validation failed:'

  if (!password) {
    return response.status(400).json({
      error: `${errorPassBase} password: is missing`
    })
  } else if (password.length < 3) {
    return response.status(400).json({
      error: `${errorPassBase} password: length is minor than 3`
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: `${errorPassBase} username: must be unique`
    })
  }

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, passwordHash, name })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter