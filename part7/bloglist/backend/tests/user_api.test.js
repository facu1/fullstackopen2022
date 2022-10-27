const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('../tests/test_helper')

beforeEach(async () => {
  await User.deleteMany({})

  await User.insertMany(helper.initialUsers)
})

describe('addition of a new user', () => {
  test('succeeds with status code 201 with valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user1',
      password: 'password1',
      name: 'User 1'
    }

    const savedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const { username, name } = savedUser.body

    delete newUser.password

    expect({ username, name }).toEqual(newUser)
  })

  test('succeeds with status code 201 with valid data without name', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user1',
      password: 'password1'
    }

    const savedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const { username } = savedUser.body

    delete newUser.password

    expect({ username }).toEqual(newUser)
  })

  test('fails with status code 400 with invalid data, without username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'password1',
      name: 'User 1'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(response.body).toEqual({
      error: 'User validation failed: username: is missing'
    })
  })

  test('fails with status code 400 with invalid data, with username property length minor than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'us',
      password: 'password1',
      name: 'User 1'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(response.body).toEqual({
      error: 'User validation failed: username: length is minor than 3'
    })
  })

  test('fails with status code 400 with usarname already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'root2123',
      name: 'root 2'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(response.body).toEqual({
      error: 'User validation failed: username: must be unique'
    })
  })

  test('fails with status code 400 with invalid data, without password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user1',
      name: 'User 1'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(response.body).toEqual({
      error: 'User validation failed: password: is missing'
    })
  })

  test('fails with status code 400 with invalid data, with password property length minor than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user1',
      password: 'pa',
      name: 'User 1'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(response.body).toEqual({
      error: 'User validation failed: password: length is minor than 3'
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})