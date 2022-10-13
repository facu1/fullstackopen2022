import { connect } from "react-redux"
import { filterChange } from '../reducers/filterReducer'

const Filter = ({ filterChange }) => {

  const handleChange = (event) => {
    const filter = event.target.value
    filterChange(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter