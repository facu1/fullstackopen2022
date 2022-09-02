const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes
  })

  const savedBlog = await blog.save()
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