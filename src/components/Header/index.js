import {withRouter, Link} from 'react-router-dom'
import {AiFillHome, AiFillMail} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="header-main-container-mobile-view">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="header-buttons-container-mobile-view">
          <Link to="/" className="link-style">
            <li className="list-item">
              <AiFillHome className="header-icons" />
            </li>
          </Link>
          <Link to="/jobs" className="link-style">
            <li className="list-item">
              <AiFillMail className="header-icons" />
            </li>
          </Link>
          <button type="button" onClick={logout} className="logout-button">
            <Link to="/logout" className="link-style">
              <FiLogOut className="header-icons" />
            </Link>
          </button>
        </ul>
      </nav>

      <nav className="header-main-container-system-view">
        <Link to="/" className="link-style">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="header-buttons-container-system-view">
          <Link to="/" className="link-style">
            <li className="home-tag">Home</li>
          </Link>
          <Link to="/jobs" className="link-style">
            <li className="jobs-tag">Jobs</li>
          </Link>
        </ul>
        <button type="button" onClick={logout} className="logout-button">
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
