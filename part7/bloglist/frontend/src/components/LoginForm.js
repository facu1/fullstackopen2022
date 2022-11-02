import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { defineUser } from '../reducers/userReducer'
import loginService from '../services/login'
import Notification from './Notification'

import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import './LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      dispatch(defineUser(user))

      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Fails wrong username or password', 3))
      console.log(exception)
    }
  }

  return (
    <Card className="login-form" title="Log in to application">
      <form onSubmit={handleLogin}>
        <Notification />
        <span className="p-float-label login-form__field">
          <InputText
            id="username"
            className="login-form__input"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor="username">Username</label>
        </span>
        <span className="p-float-label login-form__field">
          <InputText
            id="password"
            className="login-form__input"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <label htmlFor="password">Password</label>
        </span>
        <Button id="login-button" type="submit" label="Login" />
      </form>
    </Card>
  )
}

export default LoginForm
