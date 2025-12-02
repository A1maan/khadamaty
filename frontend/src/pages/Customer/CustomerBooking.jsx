import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchServices, createCustomerBooking } from '../../api/customer'
import './CustomerPages.css'

const CustomerBooking = () => {
  const { providerId } = useParams()
  const [service, setService] = useState(null)
  const [formValues, setFormValues] = useState({ date: '', time: '', notes: '' })
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingService, setLoadingService] = useState(true)
  const [serviceError, setServiceError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoadingService(true)
    fetchServices(null, { signal: controller.signal })
      .then((data) => {
        const services = data?.services ?? []
        const match = services.find((item) => (item._id ?? item.id ?? '').toString() === providerId)
        if (!match) {
          setService(null)
          setServiceError('Service not found. Please pick another provider.')
          return
        }
        const priceSuffix = match.priceType ? ` / ${match.priceType}` : ''
        setService({
          id: (match._id ?? match.id ?? '').toString(),
          name: match.name ?? 'Service',
          description: match.description ?? 'Description coming soon.',
          category: match.category ?? 'general',
          price: match.price,
          pricing: match.price ? `SAR ${match.price}${priceSuffix}` : match.pricing ?? 'Pricing on request',
          demand: match.demand ?? 'Medium',
          rating: match.rating ?? 4.8,
          reviews: match.reviews ?? 0,
          availability: match.availability ?? 'Within 24 hours',
        })
        setServiceError(null)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setService(null)
        setServiceError(error.message ?? 'Failed to load service details.')
      })
      .finally(() => {
        setLoadingService(false)
      })

    return () => controller.abort()
  }, [providerId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBooking = async (event) => {
    event.preventDefault()
    if (!service) {
      setFeedback('Please choose a valid provider.')
      return
    }
    if (!formValues.date || !formValues.time) {
      setFeedback('Please select a date and time to continue.')
      return
    }
    const customerId = typeof window !== 'undefined' ? window.localStorage.getItem('customerId') : null
    if (!customerId) {
      setFeedback('Please sign in before booking.')
      return
    }
    const datetime = new Date(`${formValues.date}T${formValues.time}`)
    if (Number.isNaN(datetime.getTime())) {
      setFeedback('Invalid date or time selected.')
      return
    }

    try {
      setIsSubmitting(true)
      setFeedback('')
      await createCustomerBooking(customerId, {
        serviceId: service.id,
        datetime: datetime.toISOString(),
        notes: formValues.notes,
      })
      setFeedback('Request submitted! You can track it from Active Requests.')
      setFormValues({ date: '', time: '', notes: '' })
    } catch (error) {
      setFeedback(error.message ?? 'Booking failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveForLater = () => {
    setFeedback('Saving for later will be available soon.')
  }

  if (loadingService) {
    return (
      <div className="customer-page">
        <Sidebar userType="customer" />
        <main className="customer-content">
          <header className="customer-hero">
            <div>
              <p className="eyebrow">Booking</p>
              <h1>Loading service...</h1>
              <p>Fetching up-to-date service details.</p>
            </div>
          </header>
        </main>
      </div>
    )
  }

  if (serviceError || !service) {
    return (
      <div className="customer-page">
        <Sidebar userType="customer" />
        <main className="customer-content">
          <header className="customer-hero">
            <div>
              <p className="eyebrow">Booking</p>
              <h1>Provider not found</h1>
              <p>{serviceError ?? 'Head back to browse and pick another service.'}</p>
            </div>
            <Link to="/customer/browse" className="btn-secondary-link">
              Back to providers
            </Link>
          </header>
        </main>
      </div>
    )
  }

  return (
    <div className="customer-page">
      <Sidebar userType="customer" />
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">Booking</p>
            <h1>{service.name}</h1>
            <p>{service.description}</p>
          </div>
          <Link to="/customer/browse" className="btn-secondary-link">
            Back to providers
          </Link>
        </header>

        <div className="booking-card">
          <div className="booking-details">
            <h2>Overview</h2>
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Pricing:</strong> {service.pricing}</p>
            <p><strong>Demand:</strong> {service.demand}</p>
            <p><strong>Rating:</strong> {service.rating} ★ ({service.reviews} reviews)</p>
            <p><strong>Availability:</strong> {service.availability}</p>
          </div>
          {/* This for mwwill handle the booking details */}
          <form className="booking-details" onSubmit={handleBooking}>
            <h2>Request Details</h2>
            <label>
              Preferred Date
              <input type="date" name="date" value={formValues.date} onChange={handleChange} required />
            </label>
            <label>
              Preferred Time
              <input type="time" name="time" value={formValues.time} onChange={handleChange} required />
            </label>
            <label>
              Notes
              <textarea
                rows="4"
                name="notes"
                placeholder="Add a short brief for the provider"
                value={formValues.notes}
                onChange={handleChange}
              ></textarea>
            </label>
            <button type="submit" className="btn-primary-solid" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Confirm Request'}
            </button>
          </form>
          {/* The user have the option to save it for later*/}
          <div className="booking-actions">
            <button type="button" className="btn-ghost" onClick={handleSaveForLater}>
              Save for later
            </button>
            {feedback && <p className="form-feedback">{feedback}</p>}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CustomerBooking
