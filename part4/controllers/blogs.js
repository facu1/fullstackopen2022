const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async ({ body, params }, response) => {
  const { id } = params
  const { title, author, url, likes } = body
  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async ({ params }, response) => {
  const { id } = params

  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

module.exports = blogsRouter