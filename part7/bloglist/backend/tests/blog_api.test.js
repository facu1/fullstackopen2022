const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = {
    username: 'user1',
    password: 'password1',
    name: 'User 1'
  }

  const user = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog({ ...blog, user: user.body.id }))

  const promisesArray = blogObjects
    .map((blog) => blog.save())

  await Promise.all(promisesArray)
})

describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog', () => {
  test('succeeds with status code 201 with valid data', async () => {
    const blogsAtStart = helper.initialBlogs

    const responseLogin = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'password1' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `bearer ${responseLogin.body.token}`

    const newBlog = {
      title: 'Blog 3',
      author: 'Author 3',
      url: 'www.amazon.com',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const blogsContent = blogsAtEnd
      .map(({ title, author, url, likes }) => ({ title, author, url, likes }))

    expect(blogsContent).toContainEqual(newBlog)
  })

  test('succeeds with status code 201 if likes property is missing', async () => {
    const responseLogin = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'password1' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `bearer ${responseLogin.body.token}`

    const newBlog = {
      title: 'Blog 3',
      author: 'Author 3',
      url: 'www.amazon.com'
    }

    const createdBlog = await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(createdBlog.body.likes).toBe(0)
  })

  test('fails with status code 400 if url and title properties are missing', async () => {
    const responseLogin = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'password1' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `bearer ${responseLogin.body.token}`

    const newBlog = {
      author: 'Author 3',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)
  })

  test('fails with status code 401 if a token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Blog 19',
      author: 'Author 19',
      url: 'www.twitter.com',
      likes: 10
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    expect(response.body).toEqual({ error: 'invalid token' })
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const responseLogin = await api
      .post('/api/login')
      .send({ username: 'user1', password: 'password1' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = `bearer ${responseLogin.body.token}`

    const blogsInDb = await helper.blogsInDb()

    const [blog] = blogsInDb

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set({ Authorization: token })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    expect(blogsAtEnd).not.toContainEqual(blog)
  })
})

describe('updation of a blog', () => {
  test('succeds with status code 200 if data and id are valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const [blogToUpdate] = blogsAtStart
    blogToUpdate.likes = blogToUpdate.likes + 1

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body.likes).toBe(blogToUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})