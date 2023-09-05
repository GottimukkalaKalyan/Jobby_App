import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import CreateJobItem from '../JobItem'
import FilterGroup from '../FilterGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiConstants.inProgress,
    searchInput: '',
    checkboxInputs: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput, checkboxInputs, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${salaryRange}&search=${searchInput}&`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const responseJobs = await response.json()
    if (response.ok) {
      const updatedJobs = responseJobs.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobsList: updatedJobs, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  changeRadio = event => {
    this.setState({salaryRange: event.target.id}, this.getJobs)
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  addCheckbox = event => {
    const {checkboxInputs} = this.state
    const inputs = checkboxInputs.filter(each => each === event.target.id)
    if (inputs.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobs,
      )
    } else {
      const removeCheck = checkboxInputs.filter(
        each => each !== event.target.id,
      )
      this.setState({checkboxInputs: removeCheck}, this.getJobs)
    }
  }

  searchInputbuttonClicked = () => {
    this.getJobs()
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length !== 0) {
      return (
        <div className="jobs-screen-container">
          {jobsList.map(eachJob => (
            <CreateJobItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </div>
      )
    }
    return (
      <div className="no-jobs-screen-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="unsuccess-ul-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page-main-container">
          <div className="filterContainer">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                className="search-icon-container"
                data-testid="searchButton"
                onClick={this.searchInputbuttonClicked}
              >
                <BiSearchAlt2 />
              </button>
            </div>
            <Profile />
            <FilterGroup
              employmentTypes={employmentTypesList}
              salaryRangesList={salaryRangesList}
              addCheckbox={this.addCheckbox}
              changeRadio={this.changeRadio}
            />
          </div>
          {this.renderJobs()}
        </div>
      </>
    )
  }
}

export default Jobs
