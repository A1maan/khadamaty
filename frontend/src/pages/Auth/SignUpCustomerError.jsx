/* this error screen lets customers correct mismatched passwords */
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

const SignUpCustomerError = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const defaults = location.state ?? {}
  const [formData, setFormData] = useState({
    email: defaults.email ?? '',
    mobile: defaults.mobile ?? '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const mismatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword

  const handleRetry = () => {
    navigate('/signup', { state: { ...formData } })
  }

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin" />
      
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Password Error</h2>
            <p className="auth-description error-text">
              The passwords you entered do not match. Please re-enter to continue.
            </p>
            
            <form className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <div className="phone-input">
                  <span className="country-code">+966</span>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="5x xxx xxxx"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`form-group ${mismatch ? 'has-error' : ''}`}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="*****************"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className={`form-group ${mismatch ? 'has-error' : ''}`}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="*****************"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {mismatch && <span className="error-inline">Passwords do not match.</span>}
              </div>

              <button type="button" className="btn-submit" onClick={handleRetry}>
                Try Again
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignUpCustomerError
