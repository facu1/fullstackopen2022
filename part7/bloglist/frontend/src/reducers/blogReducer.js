import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  initialState: [],
  name: 'blogs',
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    replaceBlog(state, action) {
      const updatedBlog = action.payload

      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    appendComment(state, action) {
      const { blogId, newComment } = action.payload
      return state.map((blog) => {
        if (blog.id === blogId) {
          const updatedBlog = { ...blog }
          updatedBlog.comments = updatedBlog.comments.concat(newComment)
          return updatedBlog
        }
        return blog
      })
    }
  }
})

export const { setBlogs, appendBlog, replaceBlog, deleteBlog, appendComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(replaceBlog(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const createComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(blogId, comment)
    dispatch(appendComment({ blogId, newComment }))
  }
}

export default blogSlice.reducer
