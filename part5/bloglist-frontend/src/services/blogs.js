import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const likeBlog = async (blog) => {
  blog.likes += 1

  const request = await axios.put(`${baseUrl}/${blog.id}`, blog)

  return request.data
}

const blogService = { getAll, create, setToken, likeBlog }

export default blogService