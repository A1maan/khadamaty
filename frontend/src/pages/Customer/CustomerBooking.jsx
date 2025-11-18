import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const CustomerBooking = () => {
  const { providerId } = useParams()


  // This is the structure for the provider 
  const provider = useMemo(  
    () => ({
      id: providerId ?? 'unknown',
      name: providerId ?? 'Provider',
      description: 'Provider details will be shown here once data is connected.',
      category: 'Category',
      pricing: 'Pricing details to be added',
      demand: 'Demand details to be added',
      rating: 'Rating TBD',
      reviews: '0',
      availability: 'Availability TBD',
    }),
    [providerId]
  )
  const [formValues, setFormValues] = useState({ date: '', time: '', notes: '' })
  const [feedback, setFeedback] = useState('')
  // This will change the values saved in the form
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }
  // This fucntion will handle the booking action
  const handleBooking = (event) => {
    event.preventDefault()
    if (!formValues.date || !formValues.time) {
      setFeedback('Please select a date and time to continue.')
      return
    }
    setFeedback('Request submitted! (placeholder until real booking logic is wired)')
    setFormValues({ date: '', time: '', notes: '' })
  }
  // This function will handle save the booking for later 
  const handleSaveForLater = () => {
    setFeedback('Provider saved for later. (placeholder until save logic is wired)')
  }

  if (!provider) {
    return (
      <div className="customer-page">
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
            <button type="submit" className="btn-primary-solid">
              Confirm Request
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
