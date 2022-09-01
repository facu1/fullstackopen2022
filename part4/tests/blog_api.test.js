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

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    const [firstNote] = response.body

    expect(firstNote.id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const blogsAtStart = helper.initialBlogs

    const newBlog = {
      title: 'Blog 3',
      author: 'Author 3',
      url: 'www.amazon.com',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const blogsContent = blogsAtEnd
      .map(({ title, author, url, likes }) => ({ title, author, url, likes }))

    expect(blogsContent).toContainEqual(newBlog)
  })

  test('if the likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Blog 3',
      author: 'Author 3',
      url: 'www.amazon.com'
    }

    const createdBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(createdBlog.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})