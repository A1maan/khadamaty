import Sidebar from '../../components/Sidebar/Sidebar'
import './Admin.css'

const AdminDashboard = () => {
  const pendingApprovals = [
    { id: 1, name: 'Name' },
    { id: 2, name: 'Name' },
    { id: 3, name: 'Name' },
  ]

  const topProviders = [
    { id: 1, name: 'Name', service: 'service' },
    { id: 2, name: 'Name', service: 'service' },
    { id: 3, name: 'Name', service: 'service' },
  ]

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="approvals-section">
          <h2>Incoming Approvals</h2>
          <div className="approvals-grid">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="approval-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="approval-info">
                  <h4>{approval.name}</h4>
                  <button className="btn-view">View Profile</button>
                </div>
                <div className="approval-actions">
                  <button className="btn-approve">
                    <ion-icon name="checkbox-outline"></ion-icon>
                  </button>
                  <button className="btn-reject">
                    <ion-icon name="close-circle-outline"></ion-icon>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="providers-section">
          <h2>Most Requested Providers</h2>
          <div className="providers-list">
            {topProviders.map((provider) => (
              <div key={provider.id} className="provider-item">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="provider-details">
                  <h4>{provider.name}</h4>
                  <p>{provider.service}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
