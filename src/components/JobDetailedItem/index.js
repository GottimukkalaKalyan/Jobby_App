import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import './index.css'

const JobDetailedItem = props => {
  const {jobDetailsList} = props
  const {jobDetails, similarJobs} = jobDetailsList
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    lifeAtCompany,
    skills,
  } = jobDetails
  const {description, imageUrl} = lifeAtCompany

  return (
    <>
      <div className="job-detailed-container">
        <div className="job-detailed-header-section">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="companyLogoUrl"
          />
          <div className="job-detailed-title-and-rating">
            <h1 className="title">{title}</h1>
            <div className="job-detailed-rating-card">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-detailed-location-and-lpa">
          <div className="job-detailed-location-and-employmentType">
            <MdLocationOn className="locationIcon" />
            <p className="location">{location}</p>
            <MdWork className="job-detailed-employmentTypeIcon" />
            <p className="employmentType">{employmentType}</p>
          </div>
          <p className="packagePerAnnum">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <div className="">
          <div className="description-and-url">
            <h1 className="job-detailed-jobDescription-heading">Description</h1>
            <div className="anchor-container">
              <a href={companyWebsiteUrl} className="visit">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="job-detailed-jobDescription" target="_blank">
            {jobDescription}
          </p>
        </div>
        <div className="skills-container">
          <h1 className="skill-heading">Skills</h1>
          <ul className="skill-ul-container">
            {skills.map(eachSkill => (
              <li className="skill-item" key={eachSkill.imageUrl}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <h1 className="skill-name">{eachSkill.name}</h1>
              </li>
            ))}
          </ul>
        </div>
        <div className="life-at-company-container">
          <h1 className="life-at-heading">Life at Company</h1>
          <div className="life-at-description-and-image">
            <p className="life-at-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-image"
            />
          </div>
        </div>
      </div>
      <div className="similar-jobs-detailed-main-container">
        <h1 className="similar-heading">Similar Jobs</h1>
        <div className="similar-jobs-card-container">
          <ul className="similar-card-ul-list">
            {similarJobs.map(eachSimilar => (
              <li className="similar-job-list-item" key={eachSimilar.title}>
                <div className="job-detailed-header-section">
                  <img
                    src={eachSimilar.companyLogoUrl}
                    alt="similar job company logo"
                    className="companyLogoUrl"
                  />
                  <div className="job-detailed-title-and-rating">
                    <h1 className="similar-title">{eachSimilar.title}</h1>
                    <div className="job-detailed-rating-card">
                      <AiFillStar className="star" />
                      <p className="rating">{eachSimilar.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="similar-description-and-url">
                  <h1 className="similar-job-jobDescription-heading">
                    Description
                  </h1>
                  <p>{eachSimilar.jobDescription}</p>
                </div>
                <div className="job-detailed-location-and-employmentType">
                  <MdLocationOn className="locationIcon" />
                  <p className="location">{eachSimilar.location}</p>
                  <MdWork className="job-detailed-employmentTypeIcon" />
                  <p className="employmentType">{eachSimilar.employmentType}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default JobDetailedItem
