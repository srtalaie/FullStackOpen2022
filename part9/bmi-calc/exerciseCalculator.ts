interface exerciseOutput {
  periodLength?: number,
  trainingDays?: number,
  success?: boolean,
  rating?: number,
  ratingDescription?: string,
  target?: number,
  average?: number
}

const validateArgs = (...args): Array<number> => {
  if (args[0].length < 3) throw new Error('Not enough arguments')

  let input: Array<number> = args[0].splice(2, args[0].length)

  let validatedArgs: Array<number> = input.map((number) => {
    if (!isNaN(Number(number))) {
      return number
    }
  })

  return validatedArgs
}

const exerciseCalculator = (...args) => {
  let output: exerciseOutput = {}
  const hoursPerDay: Array<number> = args[0].slice(1, (args[0].length))
  const targetHoursPerDay: number = args[0][0]
  const trainingDays: number = hoursPerDay.filter(hours => hours > 0).length
  const sum: number = (hoursPerDay.reduce((a, b) => Number(a) + Number(b), 0))
  const average: number = sum / hoursPerDay.length

  if (targetHoursPerDay > average) {
    output = {
      periodLength: hoursPerDay.length,
      trainingDays: trainingDays,
      success: false,
      rating: 1,
      ratingDescription: "You did not meet your goals, keep at it.",
      target: targetHoursPerDay,
      average: average
    }
  } else if (targetHoursPerDay === average) {
    output = {
      periodLength: hoursPerDay.length,
      trainingDays: trainingDays,
      success: true,
      rating: 2,
      ratingDescription: "You hit your target! Time to set a higher one.",
      target: targetHoursPerDay,
      average: average
    }
  } else {
    output = {
      periodLength: hoursPerDay.length,
      trainingDays: trainingDays,
      success: true,
      rating: 3,
      ratingDescription: "You smashed your target! Great work!.",
      target: targetHoursPerDay,
      average: average
    }
  }

  return output
}

try {
  const args = validateArgs(process.argv)
  console.log(exerciseCalculator(args))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}