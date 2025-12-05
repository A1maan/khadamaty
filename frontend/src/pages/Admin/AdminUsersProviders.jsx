/* this screen lets admins audit provider accounts and flip activation states */
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchAllServiceProviders, updateProviderStatus } from '../../api/admin'
import './Admin.css'

const AdminUsersProviders = () => {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState(null)

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true)
        const response = await fetchAllServiceProviders()
        setProviders(response?.data || [])
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to load providers')
        setProviders([])
      } finally {
        setLoading(false)
      }
    }
    loadProviders()
  }, [])

  const handleStatusUpdate = async (providerId, status) => {
    try {
      await updateProviderStatus(providerId, status)
      // Refresh providers list
      const response = await fetchAllServiceProviders()
      setProviders(response?.data || [])
      setSelectedProvider(null) // Close panel
      alert(`Provider status updated to ${status}`)
    } catch (err) {
      alert('Failed to update provider status: ' + (err.message || 'Unknown error'))
    }
  }

  const getStatusLabel = (provider) => {
    if (!provider.isVerified) return 'Pending'
    if (provider.isFeatured) return 'Activated'
    return 'Verified'
  }

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />

      <main className="admin-content">
        <section className="users-section">
          <h2>Providers</h2>
          {loading && <div className="content-placeholder">Loading providers...</div>}
          {error && <div className="content-placeholder error">{error}</div>}

          {/* provider list grid */}
          <div className="users-grid">
            {!loading && !error && providers.length === 0 && (
              <div className="content-placeholder">No providers found.</div>
            )}
            {providers.map((provider) => {
              const statusLabel = getStatusLabel(provider)
              return (
                <article key={provider._id || provider.id} className="user-card">
                  <ion-icon name="person-circle-outline"></ion-icon>

                  <div className="user-info">
                    <h4>{provider.name || 'Unnamed Provider'}</h4>
                    <p>{provider.email || 'No email'}</p>

                    {/* dynamic badge based on provider status */}
                    <span className={`status-badge ${statusLabel.toLowerCase()}`}>
                      {statusLabel}
                    </span>

                    <p className="user-meta">National ID: {provider.nationalID || 'N/A'}</p>

                    {/* toggle quick-view panel for this provider */}
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => setSelectedProvider(provider)}
                    >
                      {selectedProvider?._id === provider._id || selectedProvider?.id === provider.id ? 'Close' : 'View Profile'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {selectedProvider && (
          /* this lightweight panel avoids routing to a whole new detail page */
          <section className="users-section detail-panel">
            <h2>{selectedProvider.name || 'Unnamed Provider'}</h2>
            <p>Email: {selectedProvider.email || 'N/A'}</p>
            <p>Phone: {selectedProvider.phone || 'N/A'}</p>
            <p>National ID: {selectedProvider.nationalID || 'N/A'}</p>
            <p>Status: {getStatusLabel(selectedProvider)}</p>

            {/* quick status-change controls */}
            <div className="panel-actions">
              <button
                type="button"
                className="btn-primary-solid compact"
                onClick={() => handleStatusUpdate(selectedProvider._id || selectedProvider.id, 'Activated')}
              >
                Activate
              </button>

              <button
                type="button"
                className="btn-ghost compact"
                onClick={() => handleStatusUpdate(selectedProvider._id || selectedProvider.id, 'Suspended')}
              >
                Suspend
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default AdminUsersProviders
