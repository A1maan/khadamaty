/* Provider view for managing active service requests (mark done & message customers) */
import { useMemo, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Provider.css'

const ActiveRequests = () => {
  // Pull provider data + helper actions from our mock context
  const { providerData, markProviderRequestCompleted, pushToast } = useMockData()

  // Local UI states for search + messaging
  const [searchTerm, setSearchTerm] = useState('')
  const [messageTarget, setMessageTarget] = useState(null) // which request we’re typing a message for
  const [messageBody, setMessageBody] = useState('')       // message text itself

  // Filter requests based on search input (case-insensitive)
  const filteredRequests = useMemo(() => {
    if (!searchTerm.trim()) return providerData.activeRequests
    const normalized = searchTerm.trim().toLowerCase()
    return providerData.activeRequests.filter((request) =>
      `${request.customer} ${request.service}`.toLowerCase().includes(normalized)
    )
  }, [providerData.activeRequests, searchTerm])

  // Fake messaging action — just triggers a toast and clears the box
  const handleSendMessage = (event) => {
    event.preventDefault()
    if (!messageTarget || !messageBody.trim()) return
    pushToast('Message sent to customer')
    setMessageTarget(null)
    setMessageBody('')
  }

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />

      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Requests</p>
            <h2>Active Requests</h2>
          </div>

          {/* Search bar for filtering visible requests */}
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Search active requests"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <section className="provider-cards">
          {/* Simple placeholder when there’s nothing to show */}
          {filteredRequests.length === 0 && (
            <div className="content-placeholder">No active requests found.</div>
          )}

          {/* Show one card per active request */}
          {filteredRequests.map((request) => {
            const chipClass = request.status.replace(' ', '').toLowerCase()
            const isMessaging = messageTarget === request.id

            return (
              <article key={request.id} className="request-card">
                <div className="request-header">
                  <div>
                    <h3>{request.customer}</h3>
                    <p>{request.service}</p>
                  </div>
                  <span className={`status-pill ${chipClass}`}>
                    {request.status}
                  </span>
                </div>

                <div className="request-meta">
                  <span>Date: {request.date}</span>
                  <span>Time: {request.timeslot}</span>
                </div>

                <div className="request-actions">
                  {/* Mark job as completed */}
                  <button
                    type="button"
                    className="btn-primary-solid"
                    onClick={() => markProviderRequestCompleted(request.id)}
                  >
                    Mark Completed
                  </button>

                  {/* Toggle mini message box */}
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setMessageTarget(isMessaging ? null : request.id)}
                  >
                    {isMessaging ? 'Close' : 'Message'}
                  </button>
                </div>

                {/* Small message box that appears when messaging a customer */}
                {isMessaging && (
                  <form className="message-box" onSubmit={handleSendMessage}>
                    <textarea
                      rows="3"
                      value={messageBody}
                      onChange={(event) => setMessageBody(event.target.value)}
                      placeholder="Share an update with the customer"
                    ></textarea>
                    <button type="submit" className="btn-primary-outline compact">
                      Send
                    </button>
                  </form>
                )}
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default ActiveRequests
