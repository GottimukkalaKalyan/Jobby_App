import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import JobDetailedItem from '../JobDetailedItem'

import './index.css'

const apiConstans = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
}

class JobFullDeatils extends Component {
  state = {jobDetailsList: [], apiStatus: apiConstans.initial}

  componentDidMount() {
    this.getFullDetails()
  }

  getFullDetails = async () => {
    this.setState({apiStatus: apiConstans.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id + 9000}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      console.log(responseData)
      const updatedData = {
        jobDetails: {
          companyLogoUrl: responseData.job_details.company_logo_url,
          companyWebsiteUrl: responseData.job_details.company_website_url,
          employmentType: responseData.job_details.employment_type,
          id: responseData.job_details.id,
          jobDescription: responseData.job_details.job_description,
          location: responseData.job_details.location,
          packagePerAnnum: responseData.job_details.package_per_annum,
          rating: responseData.job_details.rating,
          title: responseData.job_details.title,
          lifeAtCompany: {
            description: responseData.job_details.life_at_company.description,
            imageUrl: responseData.job_details.life_at_company.image_url,
          },
          skills: responseData.job_details.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
        },
        similarJobs: responseData.similar_jobs.map(eachSimilar => ({
          companyLogoUrl: eachSimilar.company_logo_url,
          employmentType: eachSimilar.employment_type,
          jobDescription: eachSimilar.job_description,
          location: eachSimilar.location,
          rating: eachSimilar.rating,
          title: eachSimilar.title,
        })),
      }
      this.setState({
        jobDetailsList: updatedData,
        apiStatus: apiConstans.success,
      })
    } else {
      this.setState({apiStatus: apiConstans.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  //   onClickRetryButton = () => this.getFullDetails()

  callRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstans.success:
        return this.getRenderDetails()
      case apiConstans.inProgress:
        return this.renderLoadingView()
      case apiConstans.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  getRenderDetails = () => {
    const {jobDetailsList, apiStatus} = this.state
    return <JobDetailedItem jobDetailsList={jobDetailsList} />
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
      <button type="button" onClick={this.getFullDetails}>
        Retry
      </button>
    </div>
  )

  render() {
    const {jobDetailsList, apiStatus} = this.state
    console.log(jobDetailsList)
    return (
      <>
        <Header />
        <div className="job-detailed-main-container">{this.callRender()}</div>
      </>
    )
  }
}

export default JobFullDeatils
