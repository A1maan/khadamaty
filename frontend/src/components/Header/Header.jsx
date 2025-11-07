import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ showSignUp = false, signUpText = 'Sign UP', signUpLink = '/signup' }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <ion-icon name="thumbs-up-sharp"></ion-icon>
          <h1>Khadamaty</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          {showSignUp && (
            <Link to={signUpLink} className="btn-signup">
              {signUpText}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
