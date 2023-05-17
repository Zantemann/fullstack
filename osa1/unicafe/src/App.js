import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = (good / all) * 100 + " %"
    
    if (all === 0){
      return (
        <p>No feedback given</p>
      )
    }
    return (
      <table>
        <tbody>
        <StatisticLine text="good" value = {good} />
        <StatisticLine text="neutral" value ={ neutral} />
        <StatisticLine text="bad" value = {bad} />
        <StatisticLine text="all" value = {all} />
        <StatisticLine text="average" value = {average} />
        <StatisticLine text="positive" value = {positive} />
        </tbody>
      </table>
    )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)

  const addNeutral = () => setNeutral(neutral + 1)

  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text="good"/>
      <Button handleClick={addNeutral} text="neutral"/>
      <Button handleClick={addBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App