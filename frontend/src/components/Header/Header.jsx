/* shared header with logo, theme toggle, nav links, and sign up button */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../ThemeContext'
import './Header.css'

const Header = ({ showSignUp = false, signUpText = 'Sign UP', signUpLink = '/signup' }) => {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <ion-icon name="thumbs-up-sharp"></ion-icon>
          <h1>Khadamaty</h1>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <ion-icon name={isMenuOpen ? 'close' : 'menu'}></ion-icon>
        </button>
        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <ion-icon name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}></ion-icon>
          </button>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
          <Link to="/help" className="nav-link" onClick={closeMenu}>Help</Link>
          {showSignUp && (
            <Link to={signUpLink} className="btn-signup" onClick={closeMenu}>
              {signUpText}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
