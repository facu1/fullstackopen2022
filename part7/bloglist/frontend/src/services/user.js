let token = null

const getToken = () => token

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const setUser = (user) => {
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  token = user.token
}

const clearUser = () => {
  window.localStorage.clear()
  token = null
}

const userService = { getToken, getUser, setUser, clearUser }

export default userService
