/* provider version of the password mismatch screen */
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

const SignUpProviderError = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const defaults = location.state ?? {}
  const [formData, setFormData] = useState({
    businessName: defaults.businessName ?? '',
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
    navigate('/signup/provider', { state: { ...formData } })
  }

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin/provider" />
      
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Provider Password Error</h2>
            <p className="auth-description error-text">
              The passwords do not match. Please re-enter to finish creating your provider profile.
            </p>
            
            <form className="auth-form">
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Khadamaty Experts"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>

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

export default SignUpProviderError
