const Statistics = ({ good, neutral, bad, all, percentagePositive, averageScore }) => {
  return (
    <div>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {all}</p>
        <p>average: {averageScore}</p>
        <p>positive: {percentagePositive}</p>
    </div>
  )
}

export default Statistics