/* this sidebar drives nav, theme toggle, and logout for each role */
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../ThemeContext'
import './Sidebar.css'

const Sidebar = ({ userType = 'customer' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const navRef = useRef(null)
  const [navScrollState, setNavScrollState] = useState({ atStart: true, atEnd: true })

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
    { path: '/admin/users/providers', label: 'Providers' },
    { path: '/admin/users/customers', label: 'Customers' },
    { path: '/admin/users/admins', label: 'Admin Team' },
  ]

  let navItems = customerNav
  if (userType === 'provider') navItems = providerNav
  if (userType === 'admin') navItems = adminNav

  const handleLogout = () => {
    navigate('/')
  }

  useEffect(() => {
    const node = navRef.current
    if (!node) return

    const updateScrollMarkers = () => {
      const { scrollLeft, scrollWidth, clientWidth } = node
      setNavScrollState({
        atStart: scrollLeft <= 2,
        atEnd: scrollLeft + clientWidth >= scrollWidth - 2,
      })
    }

    updateScrollMarkers()
    node.addEventListener('scroll', updateScrollMarkers)
    window.addEventListener('resize', updateScrollMarkers)
    return () => {
      node.removeEventListener('scroll', updateScrollMarkers)
      window.removeEventListener('resize', updateScrollMarkers)
    }
  }, [])

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        <span className="sidebar-logo-mark">
          <ion-icon name="thumbs-up-sharp"></ion-icon>
        </span>
        <span>Khadamaty</span>
      </Link>

      <div
        className={`sidebar-nav-wrapper ${navScrollState.atStart ? '' : 'has-left'} ${navScrollState.atEnd ? '' : 'has-right'}`.trim()}
      >
        <nav ref={navRef} className="sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

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
