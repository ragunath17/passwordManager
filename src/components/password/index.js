import {Component} from 'react'
import {v4} from 'uuid'
import PasswordList from '../passwordList'
import './index.css'

const initialBackgroundClassNames = [
  'violet',
  'orange',
  'light-green',
  'golden-yellow',
  'blue',
  'red',
  'dark-blue',
]

class Password extends Component {
  state = {
    websiteInput: '',
    nameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    showPassword: false,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, nameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial ${
      initialBackgroundClassNames[
        Math.ceil(Math.random() * initialBackgroundClassNames.length - 1)
      ]
    }`

    const newPassword = {
      id: v4(),
      website: websiteInput,
      name: nameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      nameInput: '',
      passwordInput: '',
    }))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    })
  }

  render() {
    const {
      websiteInput,
      nameInput,
      passwordInput,
      passwordsList,
      searchInput,
    } = this.state
    const count = passwordsList.length
    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="password-logo"
          />
        </div>
        <div className="password-container">
          <div className="input-container">
            <h1 className="input-container-heading">Add New Password</h1>
            <form onSubmit={this.onAddPassword}>
              <div className="input-bg">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={websiteInput}
                />
              </div>
              <div className="input-bg">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Username"
                  onChange={this.onChangeNameInput}
                  value={nameInput}
                />
              </div>
              <div className="input-bg">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <input
                  type={this.showPassword ? 'text' : 'password'}
                  className="input-box"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={passwordInput}
                />
              </div>
              <div className="add-btn-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-bg-img"
          />
        </div>
        <div className="passwords-list-container">
          <div className="password-heading-container">
            <div className="password-heading-card">
              <h1 className="passwords-list-heading">Your Passwords</h1>
              <p className="password-count">{count}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <label className="show-password-container" htmlFor="Show passwords">
            <input
              id="Show passwords"
              type="checkbox"
              className="checkbox"
              checked={this.showPassword}
              onChange={this.toggleShowPassword}
            />
            Show passwords
          </label>
          {searchResults.length === 0 ? (
            <div className="no-password-img-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          ) : (
            <ul className="unordered-list">
              {searchResults.map(eachPassword => (
                <PasswordList
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Password
