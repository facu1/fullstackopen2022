import { useSelector } from 'react-redux'

import { Message } from 'primereact/message'

import './Notification.css'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification) {
    return null
  } else if (notification.startsWith('Succeeds ')) {
    return (
      <Message
        className="notification"
        severity="success"
        text={notification.slice(9)}
      />
    )
  } else {
    return (
      <Message
        className="notification"
        severity="success"
        text={notification.slice(6)}
      />
    )
  }
}

export default Notification
