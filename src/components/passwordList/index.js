import './index.css'

const PasswordList = props => {
  const {passwordDetails, toggleShowPassword, showPassword} = props
  const {id, website, name, password, initialClassName} = passwordDetails
  const initial = website ? website[0].toUpperCase() : ''

  const onDeletePasswordId = () => {
    const {deletePassword} = props
    deletePassword(id)
  }
  /*
  const onToggleShowPassword = () => {
    const {toggleShowPassword} = props
    {
      toggleShowPassword ? (
        <p className="password-list">{password}</p>
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
          className="star-img"
        />
      )
    }
  }
*/
  return (
    <li className="password-list-card">
      <div className="password-list-card-container">
        {showPassword ? (
          <div className="heading-and-text">
            <h1 className={initialClassName}>{initial}</h1>
            <div>
              <p className="password-list">{website}</p>
              <p className="password-list">{name}</p>
              <p className="password-list">{password}</p>
            </div>
          </div>
        ) : (
          <div className="heading-and-text">
            <h1 className={initialClassName}>{initial}</h1>
            <div>
              <p className="password-list">{website}</p>
              <p className="password-list">{name}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="star-img"
              />
            </div>
          </div>
        )}

        <button
          type="button"
          className="delete-btn"
          data-testid="delete"
          onClick={onDeletePasswordId}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordList
