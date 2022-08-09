const Person = ({ person, handleRemove }) => {
  const { id, name, number } = person

  const handleClick = () => {
    if (window.confirm(`delete ${name}`)) {
      handleRemove(id)
    }
  }

  return (
    <div>{ name } { number }<button onClick={handleClick}>delete</button></div>
  )
}

export default Person