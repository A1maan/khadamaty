/* Provider control center for managing live services */
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchProviderServices } from '../../api/provider'
import './Provider.css'

const formatPrice = (price, priceType) => {
  if (price == null || price === '') return 'Pricing to be shared'
  const numeric = Number(price)
  const formatted = Number.isNaN(numeric) ? price : `SAR ${numeric.toLocaleString()}`
  return priceType ? `${formatted} / ${priceType}` : formatted
}

const formatDate = (value) => {
  if (!value) return 'Just now'
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  } catch (error) {
    return 'Just now'
  }
}

const ProviderServices = () => {
  const navigate = useNavigate()
  // Local search field
  const [searchTerm, setSearchTerm] = useState('')
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const providerId = typeof window !== 'undefined' ? window.localStorage.getItem('providerId') : null

  useEffect(() => {
    if (!providerId) {
      setError('Please sign in as a provider to manage services.')
      setIsLoading(false)
      return
    }
    const controller = new AbortController()
    setIsLoading(true)
    fetchProviderServices(providerId, { signal: controller.signal })
      .then((data) => {
        const normalized = (data?.services ?? []).map((service) => ({
          id: (service._id ?? service.id ?? '').toString(),
          name: service.name ?? 'Service',
          description: service.description ?? 'Description coming soon.',
          status: service.status ?? 'Active',
          price: service.price,
          priceType: service.priceType,
          updatedAt: service.updatedAt ?? service.createdAt,
        }))
        setServices(normalized)
        setError(null)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setServices([])
        setError(err.message ?? 'Failed to load services.')
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [providerId])

  // Filter by name or description (case-insensitive)
  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        if (!searchTerm.trim()) return true
        const normalized = searchTerm.trim().toLowerCase()
        return [service.name, service.description].some((field) =>
          field.toLowerCase().includes(normalized)
        )
      }),
    [searchTerm, services]
  )

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      
      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Services</p>
            <h2>My Services</h2>
          </div>

          {/* Search + create new button */}
          <div className="provider-actions">
            <div className="search-bar">
              <ion-icon name="search-outline"></ion-icon>
              <input
                type="text"
                placeholder="Search services"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn-primary-solid"
              onClick={() => navigate('/provider/services/new')}
            >
              Create New
            </button>
          </div>
        </div>

        {isLoading && <div className="content-placeholder">Loading services...</div>}
        {error && <div className="error-state">{error}</div>}

        <section className="provider-cards">
          {/* Empty search result */}
          {!isLoading && !error && filteredServices.length === 0 && (
            <div className="content-placeholder">No services match your search.</div>
          )}

          {/* Each service card */}
          {filteredServices.map((service) => (
            <article key={service.id} className="service-card provider-card">
              <div className="service-head">
                <div className="service-icon">
                  <ion-icon name="construct-outline"></ion-icon>
                </div>

                <div className="service-body">
                  <h3 className="service-title" title={service.name}>{service.name}</h3>
                  <p className="service-description" title={service.description}>{service.description}</p>
                </div>

                <span className={`status-pill ${service.status?.toLowerCase() ?? 'active'}`}>
                  {service.status ?? 'Active'}
                </span>
              </div>

              <div className="service-meta">
                <span className="meta-item">{formatPrice(service.price, service.priceType)}</span>
                <span className="meta-item">Updated {formatDate(service.updatedAt)}</span>
              </div>

              <div className="service-actions">
                {/* Navigate to edit page */}
                <button
                  type="button"
                  className="btn-primary-outline"
                  onClick={() => navigate(`/provider/services/${service.id}/edit`)}
                >
                  EDIT
                </button>
                {/* Make a copy */}
                <button type="button" className="btn-ghost" disabled>
                  Duplicate (coming soon)
                </button>
                {/* Pause/Resume */}
                <button type="button" className="btn-ghost" disabled>
                  Pause/Resume (coming soon)
                </button>
                {/* Remove button*/}
                <button type="button" className="btn-danger" disabled>
                  Delete (coming soon)
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default ProviderServices
