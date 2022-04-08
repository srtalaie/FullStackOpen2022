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
      <table>
        <thead>
          <tr>
            <td><h3>statistics</h3></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StatisticsLine statName="good" stat={good} />
          </tr>
          <tr>
            <StatisticsLine statName="neutral" stat={neutral} />
          </tr>
          <tr>     
            <StatisticsLine statName="bad" stat={bad} />
          </tr>
          <tr>       
            <StatisticsLine statName="all" stat={all} />
          </tr>
          <tr>       
            <StatisticsLine statName="average" stat={averageScore} />
          </tr>
          <tr>       
            <StatisticsLine statName="percent positive" stat={`${percentagePositive}%`} />
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Statistics