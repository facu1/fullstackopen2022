const Notification = ({ notification }) => {
  const { msg, isSuccessful } = notification

  if (!msg) {
    return null
  }
  
  return (
    <div className={isSuccessful ? 'successful' : 'unsuccessful'}>
      {msg}
    </div>
  )
}

export default Notification