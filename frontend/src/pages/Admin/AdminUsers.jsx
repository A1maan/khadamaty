import Sidebar from '../../components/Sidebar/Sidebar'
import './Admin.css'

const AdminUsers = () => {
  const users = [
    { id: 1, name: 'Name', status: 'Activated' },
    { id: 2, name: 'Name', status: 'Activated' },
    { id: 3, name: 'Name', status: 'Activated' },
    { id: 4, name: 'Name', status: 'Activated' },
    { id: 5, name: 'Name', status: 'Activated' },
    { id: 6, name: 'Name', status: 'Activated' },
  ]

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="users-section">
          <h2>All Users</h2>
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <button className="btn-view">View Profile</button>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminUsers
