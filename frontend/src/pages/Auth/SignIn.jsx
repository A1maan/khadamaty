/* this shared sign in form tweaks copy + redirects per role */
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { signinCustomer } from '../../api/customer'
import { signinProvider } from '../../api/provider'
import './Auth.css'

// this is just a global object to hold the user roles with their specific descriptions and configurations
const configByRole = {
  customer: {
    title: 'Welcome Back',
    description: 'Sign in to continue managing your requests and bookings.',
    redirect: '/customer/dashboard',
  },
  provider: {
    title: 'Provider Login',
    description: 'Access your services, requests, and reviews.',
    redirect: '/provider/services',
  },
  admin: {
    title: 'Admin Console',
    description: 'Secure Khadamaty operations access.',
    redirect: '/admin/dashboard',
  },
}

const SignIn = ({ role = 'customer' }) => {
  // set up navigation and form state
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  // we look up the config for the role passed in, but if it's invalid or doesn't exist,
  // we just use the customer config as the default.
  const config = useMemo(() => configByRole[role] ?? configByRole.customer, [role])

  // build the header differently based on role, admins get a locked-down version with no sign up link,
  // but customers and providers can sign up. providers also get directed to the provider signup page
  const headerProps =
    role === 'admin'
      ? { showSignUp: false }
      : {
        showSignUp: true,
        signUpText: 'Sign Up',
        signUpLink: role === 'provider' ? '/signup/provider' : '/signup',
      }

  // update form data when inputs change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // submit form and redirect to dashboard
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (role === 'customer') {
        await signinCustomer({
          email: formData.email,
          password: formData.password
        })
      } else if (role === 'provider') {
        const response = await signinProvider({
          email: formData.email,
          password: formData.password
        })
        if (response?.providerId) {
          localStorage.setItem('providerId', response.providerId)
        }
      }
      navigate(config.redirect)
    } catch (err) {
      setError(err.message || 'Sign in failed')
    }
  }

  return (
    <div className="auth-page">
      <Header {...headerProps} />

      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h2>{config.title}</h2>
            <p className="auth-description">{config.description}</p>

            {error && <div className="error-message">{error}</div>}

            {/* form with email and password inputs */}
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
                Sign IN
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignIn
