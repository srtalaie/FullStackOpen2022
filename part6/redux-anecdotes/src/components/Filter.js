import { connect } from 'react-redux'
import { filterSearch } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        const filter = event.target.value
        props.filterSearch(filter)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} value={props.filter}/>
      </div>
    )
  }

const mapDispatchToProps = {
  filterSearch,
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

  export default ConnectedFilter