import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

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
      <div>
        <Title text='statistics' />
        <div>No feedback given</div>
      </div>
    )
  }

  const average = (good * 1 + bad * -1) / all
  const positive = good * 100 / all
  
  return (
    <div>
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
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <>
      <Title text='give feedback' />
      <Button onClick={handleClickGood} text='good' />
      <Button onClick={handleClickNeutral} text='neutral' />
      <Button onClick={handleClickBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
