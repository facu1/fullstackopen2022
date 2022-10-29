import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => ({
  headers: { Authorization: `bearer ${userService.getToken()}` }
})

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog) => {
  const request = await axios.post(baseUrl, newBlog, config())
  return request.data
}

const update = async (id, blog) => {
  const request = await axios.put(`${baseUrl}/${id}`, blog)

  return request.data
}

const remove = async (blogId) => {
  await axios.delete(`${baseUrl}/${blogId}`, config())
}

const createComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
  return response.data
}

const blogService = { getAll, create, update, remove, createComment }

export default blogService
