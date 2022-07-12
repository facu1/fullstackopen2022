const Header = ({course}) => <h1>{course}</h1>

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

const Total = ({exercises}) => {
  let total = 0
  exercises.forEach(exercisesAmount => {
    total += exercisesAmount
  })

  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1, part2, part3]} />
      <Total
        exercises={[part1.exercises, part2.exercises, part3.exercises]}
      />
    </div>
  )
}

export default App