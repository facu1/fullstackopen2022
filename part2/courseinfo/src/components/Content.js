import Part from "./Part"

const Content = ({ parts }) => (
  <>
    {parts.map(({id, name, exercises}) =>
      <Part key={id} text={name} exercises={exercises} />
    )}
  </>
)

export default Content