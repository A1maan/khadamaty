/* this page helps admins keep tabs on customer accounts and flag issues */
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchAllCustomers } from '../../api/admin'
import './Admin.css'

const AdminUsersCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true)
        const response = await fetchAllCustomers()
        setCustomers(response?.data || [])
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to load customers')
        setCustomers([])
      } finally {
        setLoading(false)
      }
    }
    loadCustomers()
  }, [])

  /* lightweight action (placeholder) for contacting customers */
  const handleContact = (customer) => {
    alert(`Contact email sent to ${customer.name}`)
  }

  const getStatusLabel = (customer) => {
    if (!customer.isVerified) return 'Unverified'
    return 'Active'
  }

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />

      <main className="admin-content">
        <section className="users-section">
          <h2>Customers</h2>
          {loading && <div className="content-placeholder">Loading customers...</div>}
          {error && <div className="content-placeholder error">{error}</div>}

          {/* main customer list */}
          <div className="users-grid">
            {!loading && !error && customers.length === 0 && (
              <div className="content-placeholder">No customers found.</div>
            )}
            {customers.map((customer) => {
              const statusLabel = getStatusLabel(customer)
              return (
                <article key={customer._id || customer.id} className="user-card">
                  <ion-icon name="person-circle-outline"></ion-icon>

                  <div className="user-info">
                    <h4>{customer.name || 'Unnamed Customer'}</h4>
                    <p>{customer.email || 'No email'}</p>

                    {/* status-shaded badge */}
                    <span className={`status-badge ${statusLabel.toLowerCase()}`}>
                      {statusLabel}
                    </span>

                    <div className="panel-actions">
                      {/* quick contact action */}
                      <button
                        type="button"
                        className="btn-ghost compact"
                        onClick={() => handleContact(customer)}
                      >
                        Contact
                      </button>

                      {/* open inline management panel */}
                      <button
                        type="button"
                        className="btn-ghost compact"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {selectedCustomer && (
          /* let ops act quickly without leaving this screen */
          <section className="users-section detail-panel">
            <h2>{selectedCustomer.name || 'Unnamed Customer'}</h2>
            <p>Email: {selectedCustomer.email || 'N/A'}</p>
            <p>Phone: {selectedCustomer.phone || 'N/A'}</p>
            <p>Status: {getStatusLabel(selectedCustomer)}</p>
            <p>Verified: {selectedCustomer.isVerified ? 'Yes' : 'No'}</p>
            {/* Note: Customer status update endpoint not yet implemented in backend */}
            <div className="panel-actions">
              <button
                type="button"
                className="btn-primary-solid compact"
                onClick={() => alert('Customer status update endpoint not yet implemented')}
              >
                Mark Active
              </button>
              <button
                type="button"
                className="btn-ghost compact"
                onClick={() => alert('Customer status update endpoint not yet implemented')}
              >
                Warn
              </button>
              <button
                type="button"
                className="btn-ghost compact"
                onClick={() => alert('Customer status update endpoint not yet implemented')}
              >
                Suspend
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default AdminUsersCustomers
