/* this screen lets admins audit provider accounts and flip activation states */
import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Admin.css'

const AdminUsersProviders = () => {
  const { adminData, updateAdminProviderStatus } = useMockData()
  const [selectedProvider, setSelectedProvider] = useState(null)

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />
      <main className="admin-content">
        <section className="users-section">
          <h2>Providers</h2>
          <div className="users-grid">
            {adminData.providerUsers.map((provider) => (
              <article key={provider.id} className="user-card">
                <ion-icon name="person-circle-outline"></ion-icon>
                <div className="user-info">
                  <h4>{provider.name}</h4>
                  <p>{provider.service}</p>
                  <span className={`status-badge ${provider.status.toLowerCase()}`}>
                    {provider.status}
                  </span>
                  <p className="user-meta">{provider.jobs} jobs completed</p>
                  <button type="button" className="btn-ghost" onClick={() => setSelectedProvider(provider)}>
                    {selectedProvider?.id === provider.id ? 'Close' : 'View Profile'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {selectedProvider && (
          /* this lightweight panel avoids routing to a whole new detail page */
          <section className="users-section detail-panel">
            <h2>{selectedProvider.name}</h2>
            <p>Primary service: {selectedProvider.service}</p>
            <div className="panel-actions">
              <button
                type="button"
                className="btn-primary-solid compact"
                onClick={() => updateAdminProviderStatus(selectedProvider.id, 'Activated')}
              >
                Activate
              </button>
              <button
                type="button"
                className="btn-ghost compact"
                onClick={() => updateAdminProviderStatus(selectedProvider.id, 'Suspended')}
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
