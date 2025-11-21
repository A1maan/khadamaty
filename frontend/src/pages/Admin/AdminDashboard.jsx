/* this admin dashboard shows approvals queue and a quick top providers view */
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Admin.css'

const AdminDashboard = () => {
  const { adminData, approveProviderSubmission, rejectProviderSubmission, pushToast } = useMockData()
  const pendingApprovals = adminData.providerUsers.filter((user) => user.status === 'Pending')
  const topProviders = adminData.providerUsers.filter((user) => user.status === 'Activated').slice(0, 3)

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="approvals-section">
          <h2>Incoming Approvals</h2>
          <div className="approvals-grid">
            {pendingApprovals.length === 0 && (
              <div className="content-placeholder">No pending profiles right now.</div>
            )}
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="approval-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="approval-info">
                  <h4>{approval.name}</h4>
                  <button className="btn-view" onClick={() => pushToast(`Viewing ${approval.name}`)}>
                    View Profile
                  </button>
                </div>
                <div className="approval-actions">
                  <button className="btn-approve" onClick={() => approveProviderSubmission(approval.id)}>
                    <ion-icon name="checkbox-outline"></ion-icon>
                  </button>
                  <button className="btn-reject" onClick={() => rejectProviderSubmission(approval.id)}>
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
                  <p>{provider.service ?? 'Popular services'}</p>
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
