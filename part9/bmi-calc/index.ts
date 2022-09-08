import express from 'express'
import { runBMICalc } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmiCalc/:height/:weight', (req, res) => {
  const height: number = Number(req.params.height)
  const weight: number = Number(req.params.weight)

  res.send(runBMICalc(height, weight))
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})