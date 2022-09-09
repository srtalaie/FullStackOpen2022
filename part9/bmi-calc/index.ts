/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { runBMICalc } from './bmiCalculator';
import { runExerciseCalc } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmiCalc/:height/:weight', (req, res) => {
  const height = Number(req.params.height);
  const weight = Number(req.params.weight);

  res.send(runBMICalc(height, weight));
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  const params = {
    daily_exercises,
    target
  };

  res.send(runExerciseCalc(params));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});