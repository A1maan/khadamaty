import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { signupCustomer } from '../../api/customer'
import './Auth.css'

// customer signup form - collects name, email, phone, and password
const SignUpCustomer = () => {
  const navigate = useNavigate()
  // track form inputs as the user types
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    // capture whatever input changed and update the form state dynamically
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await signupCustomer({
        name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password
      })
      // save the pending customer id so the otp page knows who to verify
      if (response?.customerId) {
        localStorage.setItem('pendingCustomerId', response.customerId)
      }
      // send them to verify their email after signup
      navigate('/signup/verify', { state: { email: formData.email } })
    } catch (err) {
      setError(err.message || 'Signup failed')
    }
  }

  return (
    <div className="auth-page">
      {/* show header with sign in link - no sign up button since they're already signing up */}
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin" />

      <main className="auth-main">
        <div className="auth-container">
          {/* centered card with form */}
          <div className="auth-card">
            <h2>Welcome to Khadamaty</h2>
            <p className="auth-description">
              Sign up to access our services and connect with professional service providers.
            </p>

            {error && <div className="error-message">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* name input */}
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* email input */}
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

              {/* phone number with country code */}
              <div className="form-group">
                <label>Mobile Number</label>
                <div className="phone-input">
                  {/* hardcoded to +966 for now since we're only supporting saudi arabia */}
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

              {/* password field */}
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

              {/* submit button */}
              <button type="submit" className="btn-submit">
                Sign UP
              </button>
            </form>

            {/* link to sign in page if they already have an account */}
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
