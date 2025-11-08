/* booking page with the figma layout plus working submit/save for later */
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './CustomerPages.css'

const CustomerBooking = () => {
  const { providerId } = useParams()
  const { addCustomerRequest, saveProviderForLater, providerMap, publicServices } = useMockData()
  const provider = useMemo(
    () => providerMap[providerId] ?? publicServices[0],
    [providerId, providerMap, publicServices]
  )
  const [formValues, setFormValues] = useState({ date: '', time: '', notes: '' })
  const [feedback, setFeedback] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBooking = (event) => {
    event.preventDefault()
    if (!formValues.date || !formValues.time) {
      setFeedback('Please select a date and time to continue.')
      return
    }
    addCustomerRequest({
      providerId: provider.id,
      date: formValues.date,
      time: formValues.time,
      notes: formValues.notes,
    })
    setFeedback('Request submitted! You can track it from Active Requests.')
    setFormValues({ date: '', time: '', notes: '' })
  }

  const handleSaveForLater = () => {
    saveProviderForLater(provider.id, formValues.notes)
    setFeedback('Provider saved. You can book whenever you are ready.')
  }

  if (!provider) {
    return (
      <div className="customer-page">
        <Sidebar userType="customer" />
        <main className="customer-content">
          <header className="customer-hero">
            <div>
              <p className="eyebrow">Booking</p>
              <h1>Provider not found</h1>
              <p>head back to browse and pick another service.</p>
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
            <h1>{provider.name}</h1>
            <p>{provider.description}</p>
          </div>
          <Link to="/customer/browse" className="btn-secondary-link">
            Back to providers
          </Link>
        </header>

        <div className="booking-card">
          <div className="booking-details">
            <h2>Overview</h2>
            <p><strong>Category:</strong> {provider.category}</p>
            <p><strong>Pricing:</strong> {provider.pricing}</p>
            <p><strong>Demand:</strong> {provider.demand}</p>
            <p><strong>Rating:</strong> {provider.rating} ★ ({provider.reviews} reviews)</p>
            <p><strong>Availability:</strong> {provider.availability}</p>
          </div>

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
            <button type="submit" className="btn-primary-solid">
              Confirm Request
            </button>
          </form>

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
