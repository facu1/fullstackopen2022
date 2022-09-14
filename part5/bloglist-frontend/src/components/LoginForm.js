import Notification from './Notification'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword, notification }) => (
  <form onSubmit={handleLogin}>
    <h1>log in to application</h1>
    <Notification notification={notification} />
    <div>
      username
      <input
        type="text"
        value={username}
        name="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm