import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({ userType = 'customer' }) => {
  const location = useLocation()

  const customerNav = [
    { path: '/customer/dashboard', label: 'Browse', active: true },
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

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        Khadamaty
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
