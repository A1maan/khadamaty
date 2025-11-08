/* provider sign up mirrors the customer form but with biz details */
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

const SignUpProvider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const statePrefill = location.state ?? {}
  const [formData, setFormData] = useState({
    businessName: statePrefill.businessName ?? '',
    email: statePrefill.email ?? '',
    mobile: statePrefill.mobile ?? '',
    password: statePrefill.password ?? '',
    confirmPassword: statePrefill.confirmPassword ?? '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // send the user to the tailored error page so copy matches figma
    if (formData.password !== formData.confirmPassword) {
      navigate('/signup/provider/error', { state: { businessName: formData.businessName } })
      return
    }
    navigate('/signup/verify')
  }

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin/provider" />
      
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Join as a Provider</h2>
            <p className="auth-description">
              Showcase your services, manage bookings, and grow your reputation with Khadamaty.
            </p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Khadamaty Experts"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
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
                  required
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
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="*****************"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="*****************"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Create Provider Account
              </button>
            </form>

            <p className="auth-footer">
              Already with Khadamaty? <Link to="/signin/provider">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignUpProvider
