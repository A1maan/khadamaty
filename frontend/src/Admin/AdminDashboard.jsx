/* this admin dashboard shows approvals queue and a quick top providers view */
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Admin.css'

const AdminDashboard = () => {
  /* pulling admin data and helper functions from mock context */
  const { adminData, approveProviderSubmission, rejectProviderSubmission, pushToast } = useMockData()

  /* filter providers waiting for approval */
  const pendingApprovals = adminData.providerUsers.filter((user) => user.status === 'Pending')

  /* get top activated providers (first 3 only) */
  const topProviders = adminData.providerUsers
    .filter((user) => user.status === 'Activated')
    .slice(0, 3)

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      
      <main className="admin-content">
        <section className="approvals-section">
          <h2>Incoming Approvals</h2>
          <div className="approvals-grid">
            {/* fallback if no pending approvals */}
            {pendingApprovals.length === 0 && (
              <div className="content-placeholder">No pending profiles right now.</div>
            )}

            {/* render pending approval cards */}
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
                  {/* approve provider from queue */}
                  <button
                    className="btn-approve"
                    onClick={() => approveProviderSubmission(approval.id)}
                  >
                    <ion-icon name="checkbox-outline"></ion-icon>
                  </button>

                  {/* reject provider from queue */}
                  <button
                    className="btn-reject"
                    onClick={() => rejectProviderSubmission(approval.id)}
                  >
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
            {/* quick overview of top activated providers */}
            {topProviders.map((provider) => (
              <div key={provider.id} className="provider-item">
                <ion-icon name="person-circle-outline"></ion-icon>

                <div className="provider-details">
                  <h4>{provider.name}</h4>

                  {/* show service name if exists, else default text */}
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
