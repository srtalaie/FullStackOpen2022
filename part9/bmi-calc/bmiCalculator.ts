interface BMIValues {
  weight: number
  height: number
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const bmiCalculator = (height: number, weight: number) => {
  let heightConversion: number = height / 100
  let result: number = weight / (heightConversion * heightConversion)
  let message: string = ""
  if (result < 16.0) {
    message = "Underweight (Severe thinness)"
  } else if (result > 16.0 && result < 16.9) {
    message = "Underweight (Moderate  thinness)"
  } else if (result > 17.0 && result < 18.4) {
    message = "Underweight (Mild thinness)"
  } else if (result > 18.5 && result < 24.9) {
    message = "Normal Range"
  } else if (result > 25.0 && result < 29.9) {
    message = "Overwieght (pre obese)"
  } else if (result > 30.0 && result < 34.9) {
    message = "Overweight (Class I)"
  } else if (result > 35.0 && result < 39.9) {
    message = "Overwieght (Class II)"
  } else {
    message = "Overwieght (Class III)"
  }
  
  console.log("BMI: " + result, message)
}

try {
  const { height, weight } = parseArguments(process.argv)
  bmiCalculator(height, weight)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}