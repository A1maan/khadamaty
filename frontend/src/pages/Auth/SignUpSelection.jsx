/* router handoff so users pick customer or provider signup */
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

// landing page where users choose which signup path to take
const SignUpSelection = () => {
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin" />
      
      <main className="auth-main">
        {/* main heading asking them to pick their role */}
        <h2 className="selection-title">
          Are You a Service Provider or Customer?
        </h2>

        {/* two cards side by side for customer and provider */}
        <div className="selection-container">
          {/* customer signup path */}
          <div className="selection-card">
            <h3>Customer</h3>
            <p>
              Access professional services from verified providers.
              Browse categories, book appointments, and manage your requests.
            </p>
            <button 
              className="btn-continue"
              onClick={() => navigate('/signup')}
            >
              CONTINUE
            </button>
          </div>

          {/* provider signup path */}
          <div className="selection-card">
            <h3>Service Provider</h3>
            <p>
              Join our platform to offer your services.
              Manage your bookings, build your reputation, and grow your business.
            </p>
            <button 
              className="btn-continue"
              onClick={() => navigate('/signup/provider')}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignUpSelection
