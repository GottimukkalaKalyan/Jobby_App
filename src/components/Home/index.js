import {Link} from 'react-router-dom'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-page-main-container">
          <div className="home-content-details-system-view">
            <h1>Find The Job That Fits Your Life</h1>
            <p>
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs" className="link-style">
              <button
                type="button"
                className="find-jobs-button"
                onClick={this.findJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
