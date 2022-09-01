const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog))

  const promisesArray = blogObjects
    .map((blog) => blog.save())

  await Promise.all(promisesArray)
})

describe('supertests', () => {
  test('returns the correct amount of blog posts in the JSON format', async () => {
    const blogsAtStart = helper.initialBlogs

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(blogsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})