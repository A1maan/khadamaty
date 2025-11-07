import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

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
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const config = useMemo(() => configByRole[role] ?? configByRole.customer, [role])
  const headerProps =
    role === 'admin'
      ? { showSignUp: false }
      : {
          showSignUp: true,
          signUpText: 'Sign Up',
          signUpLink: role === 'provider' ? '/signup/provider' : '/signup',
        }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(config.redirect)
  }

  return (
    <div className="auth-page">
      <Header {...headerProps} />
      
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h2>{config.title}</h2>
            <p className="auth-description">{config.description}</p>

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
