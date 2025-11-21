/* this page helps admins keep tabs on customer accounts and flag issues */
import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Admin.css'

const AdminUsersCustomers = () => {
  /* load customer list + admin actions */
  const { adminData, updateAdminCustomerStatus, pushToast } = useMockData()

  /* tracks the customer whose detail panel is open */
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  /* lightweight action (placeholder) for contacting customers */
  const handleContact = (customer) => {
    pushToast(`Contact email sent to ${customer.name}`)
  }

  return (
    <div className="admin-page">
      <Sidebar userType="admin" />

      <main className="admin-content">
        <section className="users-section">
          <h2>Customers</h2>

          {/* main customer list */}
          <div className="users-grid">
            {adminData.customerUsers.map((customer) => (
              <article key={customer.id} className="user-card">
                <ion-icon name="person-circle-outline"></ion-icon>

                <div className="user-info">
                  <h4>{customer.name}</h4>
                  <p>{customer.requests} requests</p>

                  {/* status-shaded badge */}
                  <span className={`status-badge ${customer.status.toLowerCase()}`}>
                    {customer.status}
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
            ))}
          </div>
        </section>

        {selectedCustomer && (
          /* let ops act quickly without leaving this screen */
          <section className="users-section detail-panel">
            <h2>{selectedCustomer.name}</h2>
            <p>Total requests: {selectedCustomer.requests}</p>
            {/* quick status-update actions */}
            <div className="panel-actions">
              <button
                type="button"
                className="btn-primary-solid compact"
                onClick={() => updateAdminCustomerStatus(selectedCustomer.id, 'Active')}
              >
                Mark Active
              </button>
              <button
                type="button"
                className="btn-ghost compact"
                onClick={() => updateAdminCustomerStatus(selectedCustomer.id, 'Warned')}
              >
                Warn
              </button>
              <button
                type="button"
                className="btn-ghost compact"
                onClick={() => updateAdminCustomerStatus(selectedCustomer.id, 'Suspended')}
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
