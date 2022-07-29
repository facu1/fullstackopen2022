import Person from "./Person"

const Persons = ({ persons }) => (
  <>
    {persons.map(({ id, name, number }) =>
      <Person key={id} name={name} number={number} />
    )}
  </>
)

export default Persons