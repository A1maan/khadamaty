/* saved list so customers can rebook or remove providers */
import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchSavedServices, unsaveService } from '../../api/customer'
import './CustomerPages.css'

const CustomerSaved = () => {
  const [savedProviders, setSavedProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSavedServices = async () => {
      const customerId = typeof window !== 'undefined' ? window.localStorage.getItem('customerId') : null
      if (!customerId) {
        setLoading(false)
        return
      }
      try {
        const response = await fetchSavedServices(customerId)
        if (response.success) {
          setSavedProviders(response.data)
        } else {
          setError(response.message || 'Failed to fetch saved services')
        }
      } catch (err) {
        setError('Failed to load saved services.')
      } finally {
        setLoading(false)
      }
    }

    loadSavedServices()
  }, [])

  const handleRemove = async (serviceId) => {
    const customerId = typeof window !== 'undefined' ? window.localStorage.getItem('customerId') : null
    if (!customerId) return

    try {
      await unsaveService(customerId, serviceId)
      // Optimistic update
      setSavedProviders((prev) => prev.filter((item) => (item.serviceId._id || item.serviceId) !== serviceId))
    } catch (err) {
      console.error('Failed to remove service:', err)
      alert('Failed to remove service. Please try again.')
    }
  }

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
          {loading && <p>Loading saved services...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && savedProviders.length === 0 && (
            <div className="empty-state">
              <ion-icon name="bookmark-outline"></ion-icon>
              <p>You have not saved any providers yet.</p>
            </div>
          )}

          {!loading && !error && savedProviders.map((entry) => {
            const service = entry.serviceId
            // Handle case where service might be null/undefined due to deletion
            if (!service) return null;

            return (
              <article key={entry._id} className="provider-row">
                <div className="provider-avatar">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </div>
                <div className="provider-summary">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="provider-meta">
                    <span>Added on {new Date(entry.createdAt).toLocaleDateString('en-US')}</span>
                    <span>SAR {service.price} {service.priceType ? `/ ${service.priceType}` : ''}</span>
                  </div>
                </div>
                <div className="booking-actions">
                  <a
                    href={`/customer/booking/${service._id}`}
                    className="btn-primary-solid"
                    style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                  >
                    Book Again
                  </a>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => handleRemove(service._id)}
                  >
                    Remove
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

export default CustomerSaved
