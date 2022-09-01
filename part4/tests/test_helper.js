const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'www.google.com',
    likes: 10
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'www.bing.com',
    likes: 5
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }