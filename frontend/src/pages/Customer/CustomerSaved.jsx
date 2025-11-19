const CustomerSaved = () => {
  const detailedProviders = []

  return (
    // Display the saved providers 
    <div className="customer-page">
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Saved</p>
            <h1>Saved Providers</h1>
            <p>Quickly book your favorite pros again.</p>
          </div>
        </header>
        {// Incase no saved providers
        }
        <section className="provider-list">
          {detailedProviders.length === 0 && (
            <div className="empty-state">
              <ion-icon name="bookmark-outline"></ion-icon>
              <p>You have not saved any providers yet.</p>
            </div>
          )}
          {// Display Saved Providers with book again and remove buttons 
          }
          {detailedProviders.map((entry) => (
            <article key={entry.providerId} className="provider-row">
              <div className="provider-avatar">
                <ion-icon name="person-circle-outline"></ion-icon>
              </div>
              <div className="provider-summary">
                <h3>{entry.provider.name}</h3>
                <p>{entry.provider.description}</p>
                <div className="provider-meta">
                  <span>Added on {new Date(entry.addedAt ?? Date.now()).toLocaleDateString('en-US')}</span>
                  <span>{entry.provider.pricing}</span>
                </div>
              </div>
              <div className="booking-actions">
                <button type="button" className="btn-primary-solid">
                  Book Again
                </button>
                <button type="button" className="btn-ghost">
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default CustomerSaved
