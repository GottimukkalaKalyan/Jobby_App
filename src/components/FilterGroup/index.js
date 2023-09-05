import './index.css'

const FilterGroup = props => {
  const renderTypesOfEmplymentItems = () => {
    const {addCheckbox, employmentTypes} = props
    return employmentTypes.map(eachType => (
      <li className="employment-item" key={eachType.employmentTypeId}>
        <input
          type="checkbox"
          id={eachType.employmentTypeId}
          value={eachType.employmentTypeId}
          onChange={addCheckbox}
        />
        <label htmlFor={eachType.employmentTypeId} className="employment-label">
          {eachType.label}
        </label>
      </li>
    ))
  }

  const renderFilterByEmplyment = () => (
    <>
      <hr className="hr-line" />
      <h1 className="type-of-employment-heading">Type of Employment</h1>
      <ul className="types-of-employments">{renderTypesOfEmplymentItems()}</ul>
    </>
  )

  const renderSalaryItems = () => {
    const {changeRadio, salaryRangesList} = props
    return salaryRangesList.map(eachType => (
      <li className="employment-item" key={eachType.salaryRangeId}>
        <input
          type="radio"
          id={eachType.salaryRangeId}
          name="option"
          onChange={changeRadio}
        />
        <label htmlFor={eachType.salaryRangeId} className="employment-label">
          {eachType.label}
        </label>
      </li>
    ))
  }

  const renderFilterBySalary = () => (
    <>
      <hr className="hr-line" />
      <h1 className="type-of-employment-heading">Salary Range</h1>
      <ul className="types-of-employments">{renderSalaryItems()}</ul>
    </>
  )

  return (
    <div className="filter-container">
      {renderFilterByEmplyment()}
      {renderFilterBySalary()}
    </div>
  )
}

export default FilterGroup
