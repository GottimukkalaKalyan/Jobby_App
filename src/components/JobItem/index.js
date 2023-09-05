import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const CreateJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    id,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <div className="job-full-details">
        <div className="header-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="companyLogoUrl"
          />
          <div className="title-and-rating">
            <h1 className="title">{title}</h1>
            <div className="rating-card">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-lpa">
          <div className="location-and-employmentType">
            <MdLocationOn className="locationIcon" />
            <p className="location">{location}</p>
            <MdWork className="employmentTypeIcon" />
            <p className="employmentType">{employmentType}</p>
          </div>
          <p className="packagePerAnnum">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div className="">
          <h1 className="jobDescription-heading">Description</h1>
          <p className="jobDescription">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default CreateJobItem
