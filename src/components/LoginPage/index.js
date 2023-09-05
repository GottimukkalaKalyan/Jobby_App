import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok === true) {
      const jwtToken = responseData.jwt_token
      this.onSubmitSuccess(jwtToken)
      this.setState({showErrorMsg: false})
    } else {
      this.setState({errorMsg: responseData.error_msg, showErrorMsg: true})
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <form className="form-control" onSubmit={this.loginButton}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="username-card">
            <label htmlFor="username" className="user-label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              className="user-input"
              placeholder="Username"
              onChange={this.changeUsername}
            />
          </div>
          <div className="password-card">
            <label htmlFor="password" className="user-label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              className="user-input"
              placeholder="Password"
              onChange={this.changePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
