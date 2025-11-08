/* lets customers simulate status changes for active bookings */
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './CustomerPages.css'

const CustomerActive = () => {
  const { customerRequests, providerMap, updateActiveRequestStatus, cancelCustomerRequest } = useMockData()
  const { activeRequests } = customerRequests

  return (
    <div className="customer-page">
      <Sidebar userType="customer" />
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Active</p>
            <h1>Active Requests</h1>
            <p>Track ongoing bookings and upcoming visits.</p>
          </div>
        </header>

        <section className="provider-list">
          {activeRequests.length === 0 && (
            <div className="empty-state">
              <ion-icon name="calendar-outline"></ion-icon>
              <p>No active bookings right now. Explore services to book a provider.</p>
            </div>
          )}

          {activeRequests.map((req) => {
            const provider = providerMap[req.providerId]
            return (
              <article key={req.id} className="provider-row">
                <div className="provider-avatar">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </div>
                <div className="provider-summary">
                  <h3>{provider?.name}</h3>
                  <p>{provider?.description}</p>
                  <div className="provider-meta">
                    <span>Status: {req.status}</span>
                    <span>Window: {req.window}</span>
                    <span>Pricing: {provider?.pricing}</span>
                  </div>
                </div>
                <div className="booking-actions">
                  <button
                    type="button"
                    className="btn-primary-solid"
                    onClick={() => updateActiveRequestStatus(req.id)}
                  >
                    Advance Status
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => cancelCustomerRequest(req.id)}
                  >
                    Cancel
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default CustomerActive
