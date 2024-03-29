const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = { username: user.username, id: user._id }

  const oneHourInSeconds = 60*60

  const token = jwt.sign(
    userForToken,
    config.SECRET,
    { expiresIn: oneHourInSeconds }
  )

  response.json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter