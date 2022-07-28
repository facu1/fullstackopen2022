import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Feedback = ({ handleClickGood, handleClickNeutral, handleClickBad }) => (
  <>
    <Title text='give feedback' />
    <Button handleClick={handleClickGood} text='good' />
    <Button handleClick={handleClickNeutral} text='neutral' />
    <Button handleClick={handleClickBad} text='bad' />
  </>
)

const Statistic = ({ text, value }) => (
  <div>{text} {value}</div>
)

const Statistics = ({ good, neutral, bad }) => (
  <>
    <Title text='statistics' />
    <Statistic text='good' value={good}/>
    <Statistic text='neutral' value={neutral}/>
    <Statistic text='bad' value={bad}/>
  </>
)

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
