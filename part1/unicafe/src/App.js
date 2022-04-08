import { useState } from 'react'

import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)

  //Event Handlers
  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setScore(score + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setScore(score - 1)
  }

  let percentagePositive = (good / all) * 100
  let averageScore = (score / all)

  return (
    <div>
      <h3>give feedback</h3>
      <div>
        <span><Button btnName="good" onClick={handleGood}></Button></span>
        <span><Button btnName="neutral" onClick={handleNeutral}></Button></span>
        <span><Button btnName="bad" onClick={handleBad}></Button></span>
      </div>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        averageScore={averageScore}
        percentagePositive={percentagePositive.toFixed(2)}
      />
    </div>
  )
}

export default App
