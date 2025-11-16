/* provider version of the password mismatch screen */
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

// provider error page 
// we preserve their business name so they don't have to retype it
const SignUpProviderError = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // pull the business name they already entered
  const defaults = location.state ?? {}
  const [formData, setFormData] = useState({
    businessName: defaults.businessName ?? '',
    email: defaults.email ?? '',
    mobile: defaults.mobile ?? '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    // update form state as they type new passwords
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // check if passwords still don't match - need both filled and different
  const mismatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword

  // send them back to the provider signup with all their data preserved
  const handleRetry = () => {
    navigate('/signup/provider', { state: { ...formData } })
  }

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin/provider" />
      
      <main className="auth-main">
        <div className="auth-container">
          {/* error card with pre-filled business name, email, and mobile */}
          <div className="auth-card">
            <h2>Provider Password Error</h2>
            <p className="auth-description error-text">
              The passwords do not match. Please re-enter to finish creating your provider profile.
            </p>
            
            <form className="auth-form">
              {/* business name is pre-filled */}
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

              {/* email pre-filled */}
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

              {/* mobile pre-filled */}
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

              {/* password fields get error styling if they don't match */}
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
                {/* show inline error if they still don't match */}
                {mismatch && <span className="error-inline">Passwords do not match.</span>}
              </div>

              {/* button sends them back to provider signup with their data */}
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
