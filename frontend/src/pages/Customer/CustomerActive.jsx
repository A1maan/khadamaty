
const CustomerActive = () => {
  // Active requests will be saved here 
  const activeRequests = []

  return (
    <div className="customer-page">
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Active</p>
            <h1>Active Requests</h1>
            <p>Track ongoing bookings and upcoming visits.</p>
          </div>
        </header>
        {// Incase there is no active requests
        }
        <section className="provider-list">
          {activeRequests.length === 0 && (
            <div className="empty-state">
              <ion-icon name="calendar-outline"></ion-icon>
              <p>No active bookings right now. Explore services to book a provider.</p>
            </div>
          )}
          {// Displaying all the active request when available 
          }
          {activeRequests.map((req) => (
            <article key={req.id} className="provider-row">
              <div className="provider-avatar">
                <ion-icon name="person-circle-outline"></ion-icon>
              </div>
              <div className="provider-summary">
                <h3>{req.providerName}</h3>
                <p>{req.providerDescription}</p>
                <div className="provider-meta">
                  <span>Status: {req.status}</span>
                  <span>Window: {req.window}</span>
                  <span>Pricing: {req.pricing}</span>
                </div>
              </div>
              {// This will update the request status 
              }
              <div className="booking-actions">
                <button type="button" className="btn-primary-solid">
                  Advance Status
                </button>
                <button type="button" className="btn-ghost">
                  Cancel
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default CustomerActive
