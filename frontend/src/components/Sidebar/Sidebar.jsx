import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../ThemeContext'
import './Sidebar.css'

const Sidebar = ({ userType = 'customer' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const customerNav = [
    { path: '/customer/dashboard', label: 'Home' },
    { path: '/customer/browse', label: 'Browse Services' },
    { path: '/customer/active', label: 'Active Requests' },
    { path: '/customer/past', label: 'Past Requests' },
    { path: '/customer/saved', label: 'Saved' },
  ]

  const providerNav = [
    { path: '/provider/services', label: 'My Services' },
    { path: '/provider/pending', label: 'Pending Requests' },
    { path: '/provider/active', label: 'Active Requests' },
    { path: '/provider/past', label: 'Past Requests' },
    { path: '/provider/reviews', label: 'My Reviews' },
  ]

  const adminNav = [
    { path: '/admin/dashboard', label: 'Incoming Approvals' },
    { path: '/admin/users', label: 'All Users' },
  ]

  let navItems = customerNav
  if (userType === 'provider') navItems = providerNav
  if (userType === 'admin') navItems = adminNav

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        <span className="sidebar-logo-mark">
          <ion-icon name="thumbs-up-sharp"></ion-icon>
        </span>
        <span>Khadamaty</span>
      </Link>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-controls">
        <button type="button" className="sidebar-control" onClick={toggleTheme}>
          <ion-icon name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}></ion-icon>
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button type="button" className="sidebar-control logout" onClick={handleLogout}>
          <ion-icon name="log-out-outline"></ion-icon>
          <span>Logout</span>
        </button>
      </div>

      <Link to="/help" className="sidebar-help">
        Help & FAQs
      </Link>

      <div className="sidebar-profile">
        <ion-icon name="person-circle-outline"></ion-icon>
      </div>
    </aside>
  )
}

export default Sidebar
