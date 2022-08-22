const dummy = (blogs) => {
  console.log(blogs)

  return 1
}

const totalLikes = (blogs) => {
  if (!blogs.length) return 0
  if (blogs.length === 1) return blogs[0].likes
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

module.exports = { dummy, totalLikes }