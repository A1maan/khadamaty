// lets customers simulate status changes for active bookings
import { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchActiveRequests, fetchServices } from '../../api/customer'
import './CustomerPages.css'

const formatWindow = (datetime) => {
  if (!datetime) return 'Schedule TBD'
  try {
    return new Date(datetime).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch (error) {
    return 'Schedule TBD'
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
        price: service.price,
        priceType: service.priceType,
        pricing: service.price
          ? `SAR ${service.price}${service.priceType ? ` / ${service.priceType}` : ''}`
          : service.pricing ?? 'Pricing on request',
      }
    }
  })
  return map
}

const CustomerActive = () => {
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
      setError('Please sign in to view your active requests.')
      setIsLoading(false)
      return
    }
    const controller = new AbortController()
    setIsLoading(true)
    fetchActiveRequests(customerId, { signal: controller.signal })
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
        setError(requestError.message ?? 'Failed to load active requests.')
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
            <p className="eyebrow">Active</p>
            <h1>Active Requests</h1>
            <p>Track ongoing bookings and upcoming visits.</p>
          </div>
        </header>

        {isLoading && (
          <div className="loading-state">
            <p>Loading your requests...</p>
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
              <ion-icon name="calendar-outline"></ion-icon>
              <p>No active bookings right now. Explore services to book a provider.</p>
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
                  <p>{service?.description ?? req.notes ?? 'Details will appear once confirmed.'}</p>
                  <div className="provider-meta">
                    <span>Status: {req.status ?? 'Active'}</span>
                    <span>Window: {formatWindow(req.datetime)}</span>
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

export default CustomerActive
