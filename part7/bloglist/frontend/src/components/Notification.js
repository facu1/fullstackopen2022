import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification) {
    return null
  } else if (notification.startsWith('Succeeds ')) {
    return <div className="notification succeeds">{notification.slice(9)}</div>
  } else {
    return <div className="notification fails">{notification.slice(6)}</div>
  }
}

export default Notification
