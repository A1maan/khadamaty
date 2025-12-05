/* this overview lets admins jump into the separate user directories and recent activity */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchAllCustomers, fetchAllServiceProviders, fetchAllAdmins } from '../../api/admin'
import './Admin.css'

const AdminUsers = () => {
  const [providers, setProviders] = useState([])
  const [customers, setCustomers] = useState([])
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAllUsers = async () => {
      try {
        setLoading(true)
        const [providersRes, customersRes, adminsRes] = await Promise.all([
          fetchAllServiceProviders(),
          fetchAllCustomers(),
          fetchAllAdmins(),
        ])
        setProviders(providersRes?.data || [])
        setCustomers(customersRes?.data || [])
        setAdmins(adminsRes?.data || [])
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    loadAllUsers()
  }, [])

  /* static directory definitions for the 3 user categories */
  const directories = [
    {
      id: 'providers',
      name: 'Providers',
      description: 'Service partners awaiting approvals & audits.',
      count: providers.length,
      path: '/admin/users/providers',
      icon: 'construct-outline',
    },
    {
      id: 'customers',
      name: 'Customers',
      description: 'Active bookers and VIP accounts.',
      count: customers.length,
      path: '/admin/users/customers',
      icon: 'people-outline',
    },
    {
      id: 'admins',
      name: 'Admin Team',
      description: 'Platform operators with elevated permissions.',
      count: admins.length,
      path: '/admin/users/admins',
      icon: 'shield-checkmark-outline',
    },
  ]

  /* pick the latest 2 providers + latest 2 customers for quick activity */
  const recentProfiles = [
    ...providers.slice(0, 2).map(p => ({ ...p, type: 'provider' })),
    ...customers.slice(0, 2).map(c => ({ ...c, type: 'customer' }))
  ]

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="users-section">
          <h2>User Directories</h2>
          {loading && <div className="content-placeholder">Loading user directories...</div>}
          {error && <div className="content-placeholder error">{error}</div>}

          {/* dashboard cards for each user group */}
          <div className="users-grid">
            {directories.map((directory) => (
              <div key={directory.id} className="user-card">
                <ion-icon name={directory.icon}></ion-icon>

                <div className="user-info">
                  <h4>{directory.name}</h4>
                  <p>{directory.description}</p>

                  {/* show the count of users */}
                  <span className="status-badge activated">
                    {directory.count} profiles
                  </span>

                  <Link to={directory.path} className="btn-view">
                    Open list
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="users-section">
          <h2>Recently Active</h2>

          {/* small list of recent provider/customer activity */}
          <div className="users-grid">
            {recentProfiles.length === 0 && !loading && (
              <div className="content-placeholder">No recent activity.</div>
            )}
            {recentProfiles.map((profile) => {
              const profileId = profile._id || profile.id
              const statusLabel = profile.type === 'provider' 
                ? (profile.isVerified ? 'Verified' : 'Pending')
                : (profile.isVerified ? 'Active' : 'Unverified')
              return (
                <article key={profileId} className="user-card">
                  <ion-icon name="person-circle-outline"></ion-icon>

                  <div className="user-info">
                    <h4>{profile.name || 'Unnamed User'}</h4>

                    {/* conditionally show fields that exist for each user type */}
                    {profile.type === 'provider' && <p>{profile.email || 'No email'}</p>}
                    {profile.type === 'customer' && <p>{profile.email || 'No email'}</p>}

                    {/* status badge */}
                    <span className={`status-badge ${statusLabel.toLowerCase()}`}>
                      {statusLabel}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminUsers
