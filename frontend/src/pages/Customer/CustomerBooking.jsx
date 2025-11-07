import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { serviceProviders } from '../../data/customerData'
import './CustomerPages.css'

const CustomerBooking = () => {
  const { providerId } = useParams()
  const provider = useMemo(
    () => serviceProviders.find((item) => item.id === providerId) ?? serviceProviders[0],
    [providerId],
  )

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

          <form className="booking-details">
            <h2>Request Details</h2>
            <label>
              Preferred Date
              <input type="date" required />
            </label>
            <label>
              Preferred Time
              <input type="time" required />
            </label>
            <label>
              Notes
              <textarea rows="4" placeholder="Add a short brief for the provider"></textarea>
            </label>
          </form>

          <div className="booking-actions">
            <button type="button" className="btn-primary-solid">
              Confirm Request
            </button>
            <button type="button" className="btn-ghost">
              Save for later
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CustomerBooking
