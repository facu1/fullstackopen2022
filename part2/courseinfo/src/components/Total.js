const Total = ({ parts }) => {
  let total = 0
  parts.forEach(({exercises}) => {
    total += exercises
  })

  return <div>total of {total} exercises</div>
}

export default Total