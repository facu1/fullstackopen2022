const PersonForm = ({handleSubmit, nameValue, handleChangeName, numberValue, handleChangeNumber}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={nameValue} onChange={handleChangeName} />
    </div>
    <div>
      number: <input value={numberValue} onChange={handleChangeNumber} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

export default PersonForm