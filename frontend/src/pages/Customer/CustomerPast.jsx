/* history tab for customers showing server-backed booking history */
import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchPastRequests, fetchServices } from '../../api/customer'
import './CustomerPages.css'

const formatDate = (value) => {
  if (!value) return 'Date TBD'
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch (error) {
    return 'Date TBD'
  }
}

const mapServices = (list) => {
  const map = {}
  list.forEach((service) => {
    const id = (service._id ?? service.id ?? '').toString()
    if (id) {
      map[id] = {
        name: service.name ?? 'Service',
        description: service.description ?? 'Description coming soon.',
        pricing: service.price
          ? `SAR ${service.price}${service.priceType ? ` / ${service.priceType}` : ''}`
          : service.pricing ?? 'Pricing on request',
      }
    }
  })
  return map
}

const CustomerPast = () => {
  const [customerId] = useState(() => (typeof window !== 'undefined' ? window.localStorage.getItem('customerId') : null))
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [servicesIndex, setServicesIndex] = useState({})

  useEffect(() => {
    const controller = new AbortController()
    fetchServices(null, { signal: controller.signal })
      .then((data) => setServicesIndex(mapServices(data?.services ?? [])))
      .catch((serviceError) => {
        if (serviceError.name === 'AbortError') return
        setServicesIndex({})
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!customerId) {
      setError('Please sign in to review your past requests.')
      setIsLoading(false)
      return
    }
    const controller = new AbortController()
    setIsLoading(true)
    fetchPastRequests(customerId, { signal: controller.signal })
      .then((data) => {
        setRequests(data?.requests ?? [])
        setError(null)
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        if (requestError.status === 404) {
          setRequests([])
          setError(null)
          return
        }
        setRequests([])
        setError(requestError.message ?? 'Failed to load past requests.')
      })
      .finally(() => {
        setIsLoading(false)
      })
    return () => controller.abort()
  }, [customerId])

  return (
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

        {isLoading && (
          <div className="loading-state">
            <p>Loading your past bookings...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        <section className="provider-list">
          {!isLoading && !error && requests.length === 0 && (
            <div className="empty-state">
              <ion-icon name="time-outline"></ion-icon>
              <p>No past bookings. Once you complete a service it will show here.</p>
            </div>
          )}

          {requests.map((req) => {
            const serviceId = (req.serviceId?._id ?? req.serviceId ?? '').toString()
            const service = servicesIndex[serviceId]
            return (
              <article key={req._id ?? req.id} className="provider-row">
                <div className="provider-avatar">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </div>
                <div className="provider-summary">
                  <h3>{service?.name ?? 'Service request'}</h3>
                  <p>{service?.description ?? req.notes ?? 'We will add more details soon.'}</p>
                  <div className="provider-meta">
                    <span>Completed: {formatDate(req.updatedAt ?? req.datetime)}</span>
                    <span>Status: {req.status ?? 'Completed'}</span>
                    <span>Pricing: {service?.pricing ?? 'TBD'}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default CustomerPast
