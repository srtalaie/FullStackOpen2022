const Statistics = ({ good, neutral, bad, all, percentagePositive, averageScore }) => {
  if(isNaN(averageScore)) {
    return (
      <div>
        <h4>No feedback given.</h4>
      </div>
    )
  } else {
    return (
      <div>
          <p>good: {good}</p>
          <p>neutral: {neutral}</p>
          <p>bad: {bad}</p>
          <p>all: {all}</p>
          <p>average: {averageScore}</p>
          <p>positive: {percentagePositive}%</p>
      </div>
    )
  }
}

export default Statistics