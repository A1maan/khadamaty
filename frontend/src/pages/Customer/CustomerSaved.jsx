/* saved list so customers can rebook or remove providers */
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './CustomerPages.css'

const CustomerSaved = () => {
  const { customerRequests, providerMap, bookSavedProvider, removeSavedProvider } = useMockData()
  const { savedProviders } = customerRequests

  const detailedProviders = savedProviders
    .map((entry) => ({ ...entry, provider: providerMap[entry.providerId] }))
    .filter((entry) => Boolean(entry.provider))

  return (
    <div className="customer-page">
      <Sidebar userType="customer" />
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Saved</p>
            <h1>Saved Providers</h1>
            <p>Quickly book your favorite pros again.</p>
          </div>
        </header>

        <section className="provider-list">
          {detailedProviders.length === 0 && (
            <div className="empty-state">
              <ion-icon name="bookmark-outline"></ion-icon>
              <p>You have not saved any providers yet.</p>
            </div>
          )}

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
                <button
                  type="button"
                  className="btn-primary-solid"
                  onClick={() => bookSavedProvider(entry.providerId)}
                >
                  Book Again
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => removeSavedProvider(entry.providerId)}
                >
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
