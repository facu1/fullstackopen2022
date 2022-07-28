import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Feedback = ({ handleClickGood, handleClickNeutral, handleClickBad }) => (
  <div>
    <Title text='give feedback' />
    <Button handleClick={handleClickGood} text='good' />
    <Button handleClick={handleClickNeutral} text='neutral' />
    <Button handleClick={handleClickBad} text='bad' />
  </div>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {text === 'positive' && '%'}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <>
        <Title text='statistics' />
        <div>No feedback given</div>
      </>
    )
  }

  const average = (good * 1 + bad * -1) / all
  const positive = good * 100 / all
  
  return (
    <>
      <Title text='statistics' />
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Feedback
        handleClickGood={() => setGood(good + 1)}
        handleClickNeutral={() => setNeutral(neutral + 1)}
        handleClickBad={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
