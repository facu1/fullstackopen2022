const Header = ({name}) => <h1>{name}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => (
  <div>
    {
      parts.map(({name, exercises}) => (
        <Part name={name} exercises={exercises} />
      ))
    }
  </div>
)

const Total = ({parts}) => {
  let total = 0
  parts.forEach(({exercises}) => {
    total += exercises
  })

  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App