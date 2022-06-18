import { useSelector, useDispatch } from 'react-redux'
import { filterSearch } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filter = event.target.value
        dispatch(filterSearch(filter))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} value={useSelector((state) => state.filter)}/>
      </div>
    )
  }
  
  export default Filter