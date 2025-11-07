import { Link } from 'react-router-dom'
import { useTheme } from '../../ThemeContext'
import './Header.css'

const Header = ({ showSignUp = false, signUpText = 'Sign UP', signUpLink = '/signup' }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <ion-icon name="thumbs-up-sharp"></ion-icon>
          <h1>Khadamaty</h1>
        </Link>
        
        <nav className="nav">
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <ion-icon name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}></ion-icon>
          </button>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/help" className="nav-link">Help</Link>
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
