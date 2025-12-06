/* this admin dashboard shows approvals queue and a quick top providers view */
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchAllServiceProviders, fetchPendingProviders, approveProvider, rejectProvider } from '../../api/admin'
import './Admin.css'

const AdminDashboard = () => {
  const [providers, setProviders] = useState([])
  const [pendingProviders, setPendingProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const [allResponse, pendingResponse] = await Promise.all([
        fetchAllServiceProviders(),
        fetchPendingProviders()
      ])

      setProviders(allResponse?.data || [])
      setPendingProviders(pendingResponse?.data || [])
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleApprove = async (providerId) => {
    try {
      await approveProvider(providerId, false)
      await loadData() // Refresh both lists
      alert('Provider approved successfully')
    } catch (err) {
      alert('Failed to approve provider: ' + (err.message || 'Unknown error'))
    }
  }

  const handleReject = async (providerId) => {
    try {
      await rejectProvider(providerId)
      await loadData() // Refresh both lists
      alert('Provider rejected successfully')
    } catch (err) {
      alert('Failed to reject provider: ' + (err.message || 'Unknown error'))
    }
  }

  /* get top activated providers (verified and featured, first 3 only) */
  const topProviders = providers
    .filter((user) => user.isVerified && user.isFeatured)
    .slice(0, 3)

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />

      <main className="admin-content">
        <section className="approvals-section">
          <h2>Incoming Approvals</h2>
          {loading && <div className="content-placeholder">Loading providers...</div>}
          {error && <div className="content-placeholder error">{error}</div>}
          <div className="approvals-grid">
            {/* fallback if no pending approvals */}
            {!loading && !error && pendingProviders.length === 0 && (
              <div className="content-placeholder">No pending profiles right now.</div>
            )}

            {/* render pending approval cards */}
            {pendingProviders.map((approval) => (
              <div key={approval._id || approval.id} className="approval-card">
                <ion-icon name="person-circle-outline"></ion-icon>

                <div className="approval-info">
                  <h4>{approval.name || 'Unnamed Provider'}</h4>
                  <p>{approval.email || ''}</p>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>ID: {approval.nationalID}</p>

                  <button className="btn-view" onClick={() => alert(`Viewing ${approval.name}\nPhone: ${approval.phone}\nNational ID: ${approval.nationalID}`)}>
                    View Details
                  </button>
                </div>

                <div className="approval-actions">
                  {/* approve provider from queue */}
                  <button
                    className="btn-approve"
                    title="Approve"
                    onClick={() => handleApprove(approval._id || approval.id)}
                  >
                    <ion-icon name="checkbox-outline"></ion-icon>
                  </button>

                  {/* reject provider from queue */}
                  <button
                    className="btn-reject"
                    title="Reject"
                    onClick={() => handleReject(approval._id || approval.id)}
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
            {topProviders.length === 0 && !loading && (
              <div className="content-placeholder">No featured providers yet.</div>
            )}
            {topProviders.map((provider) => (
              <div key={provider._id || provider.id} className="provider-item">
                <ion-icon name="person-circle-outline"></ion-icon>

                <div className="provider-details">
                  <h4>{provider.name || 'Unnamed Provider'}</h4>

                  {/* show email if exists, else default text */}
                  <p>{provider.email || 'Popular services'}</p>
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
