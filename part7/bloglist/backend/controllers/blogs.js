const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor,  async ({ body, token, user }, response) => {
  const { title, author, url, likes } = body

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' })
  }

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

  const blogToReturn = await Blog
    .findById(savedBlog.id)
    .populate('user', { username: 1, name: 1 })

  response.status(201).json(blogToReturn)
})

blogsRouter.put('/:id', async ({ body, params }, response) => {
  const { id } = params
  const { user, title, author, url, likes } = body
  const blog = { user, title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true }).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async ({ params, token, user }, response) => {
  const { id } = params

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'user not authorized' })
  }

  user.blogs = user.blogs.filter((blogFilter) => blogFilter._id.toString() !== blog._id.toString())

  await user.save()

  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

module.exports = blogsRouter