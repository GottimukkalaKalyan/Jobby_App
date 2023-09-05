import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Profile extends Component {
  state = {
    profileDetails: [],
    isProfileAvailable: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getDetails()
  }

  creteProfile = profileDetails => {
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <div className="profile-details">
          <img src={profileImageUrl} alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  retryProfileButton = () => {
    this.getDetails()
  }

  retryProfile = () => (
    <div className="profile-retry">
      <button
        type="button"
        className="retryButton"
        onClick={this.retryProfileButton}
      >
        Retry
      </button>
    </div>
  )

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const profile = await response.json()
    if (response.ok) {
      const updatedProfile = {
        name: profile.profile_details.name,
        profileImageUrl: profile.profile_details.profile_image_url,
        shortBio: profile.profile_details.short_bio,
      }
      console.log(updatedProfile)

      this.setState({profileDetails: updatedProfile, isProfileAvailable: true})
    } else {
      console.log(profile.error_msg)
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {profileDetails, isProfileAvailable, isLoading} = this.state
    return (
      <>
        {isProfileAvailable
          ? this.creteProfile(profileDetails)
          : this.retryProfile()}
      </>
    )
  }
}

export default Profile
