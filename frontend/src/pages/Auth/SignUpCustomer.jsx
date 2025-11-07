import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

const SignUpCustomer = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/signup/verify')
  }

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin" />
      
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Welcome to Khadamaty</h2>
            <p className="auth-description">
              Sign up to access our services and connect with professional service providers.
            </p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
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

              <button type="submit" className="btn-submit">
                Sign UP
              </button>
            </form>

            <p className="auth-footer">
              Already have an Account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignUpCustomer
