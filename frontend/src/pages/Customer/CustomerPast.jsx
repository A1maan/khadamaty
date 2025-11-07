import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceProviders } from '../../data/customerData'
import './CustomerPages.css'

const pastRequests = [
  { id: 'past-01', providerId: 'svc-003', completedOn: '12 Feb 2025', rating: 5 },
  { id: 'past-02', providerId: 'svc-004', completedOn: '04 Feb 2025', rating: 4 },
]

const CustomerPast = () => (
  <div className="customer-page">
    <Sidebar userType="customer" />
    <main className="customer-content">
      <header className="customer-hero">
        <div>
          <p className="eyebrow">History</p>
          <h1>Past Requests</h1>
          <p>Rebook trusted service providers or leave a review.</p>
        </div>
      </header>

      <section className="provider-list">
        {pastRequests.map((req) => {
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
                  <span>Completed: {req.completedOn}</span>
                  <span>Rating: {req.rating} ★</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-primary-solid">Rebook</button>
                <button className="btn-ghost">Leave Review</button>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  </div>
)

export default CustomerPast
