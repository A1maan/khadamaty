import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceProviders } from '../../data/customerData'
import './CustomerPages.css'

const activeRequests = [
  { id: 'req-101', providerId: 'svc-001', status: 'Awaiting confirmation', window: 'Today, 5:00 PM' },
  { id: 'req-102', providerId: 'svc-002', status: 'Scheduled', window: 'Tomorrow, 9:00 AM' },
]

const CustomerActive = () => (
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
        {activeRequests.map((req) => {
          const provider = serviceProviders.find((p) => p.id === req.providerId)
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
                <button className="btn-primary-solid">Update</button>
                <button className="btn-ghost">Cancel</button>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  </div>
)

export default CustomerActive
