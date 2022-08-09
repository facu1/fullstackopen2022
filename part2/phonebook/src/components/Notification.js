const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  
  return (
    <div className="successful">
      {message}
    </div>
  )
}

export default Notification