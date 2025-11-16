/* this error screen lets customers correct mismatched passwords */
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

// password mismatch error page - we get the email and mobile from the previous form
const SignUpCustomerError = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // pull the email and mobile they already entered so they don't have to retype them
  const defaults = location.state ?? {}
  const [formData, setFormData] = useState({
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

  // check if passwords actually mismatch now - need both to be filled and different
  const mismatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword

  // send them back to the signup form with all their data preserved
  const handleRetry = () => {
    navigate('/signup', { state: { ...formData } })
  }

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin" />
      
      <main className="auth-main">
        <div className="auth-container">
          {/* error card with pre-filled email and mobile, fresh password fields */}
          <div className="auth-card">
            <h2>Password Error</h2>
            <p className="auth-description error-text">
              The passwords you entered do not match. Please re-enter to continue.
            </p>
            
            <form className="auth-form">
              {/* email is read-only since they already verified it */}
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

              {/* mobile also pre-filled */}
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

              {/* button sends them back to signup with their data */}
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
