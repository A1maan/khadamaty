/* this overview lets admins jump into the separate user directories and recent activity */
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Admin.css'

const AdminUsers = () => {
  const { adminData } = useMockData()
  const directories = [
    {
      id: 'providers',
      name: 'Providers',
      description: 'Service partners awaiting approvals & audits.',
      count: adminData.providerUsers.length,
      path: '/admin/users/providers',
      icon: 'construct-outline',
    },
    {
      id: 'customers',
      name: 'Customers',
      description: 'Active bookers and VIP accounts.',
      count: adminData.customerUsers.length,
      path: '/admin/users/customers',
      icon: 'people-outline',
    },
    {
      id: 'admins',
      name: 'Admin Team',
      description: 'Platform operators with elevated permissions.',
      count: adminData.adminUsers.length,
      path: '/admin/users/admins',
      icon: 'shield-checkmark-outline',
    },
  ]

  const recentProfiles = [...adminData.providerUsers.slice(0, 2), ...adminData.customerUsers.slice(0, 2)]

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="users-section">
          <h2>User Directories</h2>
          <div className="users-grid">
            {directories.map((directory) => (
              <div key={directory.id} className="user-card">
                <ion-icon name={directory.icon}></ion-icon>
                <div className="user-info">
                  <h4>{directory.name}</h4>
                  <p>{directory.description}</p>
                  <span className="status-badge activated">{directory.count} profiles</span>
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
          <div className="users-grid">
            {recentProfiles.map((profile) => (
              <article key={profile.id} className="user-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="user-info">
                  <h4>{profile.name}</h4>
                  {'service' in profile && <p>{profile.service}</p>}
                  {'requests' in profile && <p>{profile.requests} requests</p>}
                  <span className={`status-badge ${(profile.status ?? 'active').toLowerCase()}`}>
                    {profile.status ?? 'Active'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminUsers
