const Total = ({ parts }) => {
  let total = parts.reduce((prev, curr) => prev + curr.exercises, 0)

  return <div>total of {total} exercises</div>
}

export default Total