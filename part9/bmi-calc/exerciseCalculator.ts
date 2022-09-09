/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface exerciseOutput {
  periodLength?: number,
  trainingDays?: number,
  success?: boolean,
  rating?: number,
  ratingDescription?: string,
  target?: number,
  average?: number
}

interface exerciseParams {
  daily_exercises?: Array<number>,
  target?: number
}

const validateArgs = (...args: Array<any>): Array<number> => {
  if (args[0].length < 3) throw new Error('Not enough arguments');

  const input: Array<number> = args[0].splice(2, args[0].length);

  const validatedArgs: Array<number> = input.map((number): number => {
    let answer = 0;
    if (!isNaN(Number(number))) {
        answer = number;
    }
    return answer;
  });

  return validatedArgs;
};

const exerciseCalculator = (...args: any) => {
  let output: exerciseOutput = {};
  const hoursPerDay: Array<number> = args[0].slice(1, (args[0].length));
  const targetHoursPerDay: number = args[0][0];
  const trainingDays: number = hoursPerDay.filter(hours => hours > 0).length;
  const sum: number = (hoursPerDay.reduce((a, b) => Number(a) + Number(b), 0));
  const average: number = sum / hoursPerDay.length;

  if (targetHoursPerDay > average) {
    output = {
      periodLength: hoursPerDay.length,
      trainingDays: trainingDays,
      success: false,
      rating: 1,
      ratingDescription: "You did not meet your goals, keep at it.",
      target: targetHoursPerDay,
      average: average
    };
  } else if (targetHoursPerDay === average) {
    output = {
      periodLength: hoursPerDay.length,
      trainingDays: trainingDays,
      success: true,
      rating: 2,
      ratingDescription: "You hit your target! Time to set a higher one.",
      target: targetHoursPerDay,
      average: average
    };
  } else {
    output = {
      periodLength: hoursPerDay.length,
      trainingDays: trainingDays,
      success: true,
      rating: 3,
      ratingDescription: "You smashed your target! Great work!.",
      target: targetHoursPerDay,
      average: average
    };
  }

  return output;
};

try {
  const args = validateArgs(process.argv);
  console.log(exerciseCalculator(args));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export function runExerciseCalc(args: exerciseParams) {
  if (!args.daily_exercises || !args.target) {
    return "parameters missing";
  }
  
  if (isNaN(args.target) || args.daily_exercises.some(isNaN)) {
    return "malformed parameters";
  }
  
  const hoursPerDay: Array<number> = args.daily_exercises;
  const target: number = args.target;

  const argsArray: Array<number> = hoursPerDay.map((day: number): number => (day));

  argsArray.unshift(target);

  try {
    return exerciseCalculator(argsArray);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
    return errorMessage;
  }
}