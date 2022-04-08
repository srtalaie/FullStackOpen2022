import StatisticsLine from "./StatisticsLine"

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
        <StatisticsLine statName="good" stat={good} />
        <StatisticsLine statName="neutral" stat={neutral} />
        <StatisticsLine statName="bad" stat={bad} />
        <StatisticsLine statName="all" stat={all} />
        <StatisticsLine statName="average" stat={averageScore} />
        <StatisticsLine statName="percent positive" stat={`${percentagePositive}%`} />
      </div>
    )
  }
}

export default Statistics