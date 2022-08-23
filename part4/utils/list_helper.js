const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)

  return 1
}

const totalLikes = (blogs) => {
  if (!blogs.length) return 0
  if (blogs.length === 1) return blogs[0].likes
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return 0
  if (blogs.length === 1) {
    const { title, author, likes } = blogs[0]

    return { title, author, likes }
  }

  let favoriteLikes = 0, indexOfFavorite = 0

  for (const [index, blog] of blogs.entries()) {
    if (blog.likes > favoriteLikes) {
      favoriteLikes = blog.likes
      indexOfFavorite = index
    }
  }

  const { title, author, likes } = blogs[indexOfFavorite]

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return 0
  if (blogs.length === 1) {
    const { author } = blogs[0]

    return { author, blogs : 1 }
  }

  let blogsGroups = _.groupBy(blogs, 'author')
  let blogsGroupsMap = _.map(blogsGroups, (value, key) => ({ author: key , blogs: value.length }))

  return _.maxBy(blogsGroupsMap, 'blogs')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }