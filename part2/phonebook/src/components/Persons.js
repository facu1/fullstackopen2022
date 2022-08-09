import Person from "./Person"

const Persons = ({ persons, handleRemove }) => (
  <>
    {persons.map((person) =>
      <Person key={person.id} person={person} handleRemove={handleRemove} />
    )}
  </>
)

export default Persons