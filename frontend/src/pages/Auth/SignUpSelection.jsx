import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

const SignUpSelection = () => {
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin" />
      
      <main className="auth-main">
        <h2 className="selection-title">
          Are You a Service Provider or Customer?
        </h2>

        <div className="selection-container">
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
