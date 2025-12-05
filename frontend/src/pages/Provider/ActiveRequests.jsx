/* Provider view for managing active service requests (mark done & message customers) */
import { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchProviderActiveRequests, updateProviderRequestStatus } from '../../api/provider'
import './Provider.css'

const ActiveRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Local UI states for search + messaging
  const [searchTerm, setSearchTerm] = useState('')
  const [messageTarget, setMessageTarget] = useState(null) // which request we’re typing a message for
  const [messageBody, setMessageBody] = useState('')       // message text itself

  const loadRequests = async () => {
    try {
      const providerId = localStorage.getItem('providerId')
      if (!providerId) {
        setError('Provider ID not found')
        setLoading(false)
        return
      }
      const data = await fetchProviderActiveRequests(providerId)
      setRequests(data.requests || [])
    } catch (err) {
      setError(err.message || 'Failed to load requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  // Filter requests based on search input (case-insensitive)
  const filteredRequests = useMemo(() => {
    if (!searchTerm.trim()) return requests
    const normalized = searchTerm.trim().toLowerCase()
    return requests.filter((request) =>
      `${request.customer || 'Unknown'} ${request.service || 'Unknown'}`.toLowerCase().includes(normalized)
    )
  }, [requests, searchTerm])

  // Fake messaging action — just triggers a toast and clears the box
  const handleSendMessage = (event) => {
    event.preventDefault()
    if (!messageTarget || !messageBody.trim()) return
    alert('Message sent to customer')
    setMessageTarget(null)
    setMessageBody('')
  }

  const markProviderRequestCompleted = async (requestId) => {
    try {
      await updateProviderRequestStatus(requestId, 'completed')
      await loadRequests()
    } catch (err) {
      console.error('Failed to complete request:', err)
      alert('Failed to complete request')
    }
  }

  const pushToast = (msg) => alert(msg)

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
          {loading && <div className="content-placeholder">Loading requests...</div>}
          {error && <div className="content-placeholder error">{error}</div>}

          {/* Simple placeholder when there’s nothing to show */}
          {!loading && !error && filteredRequests.length === 0 && (
            <div className="content-placeholder">No active requests found.</div>
          )}

          {/* Show one card per active request */}
          {filteredRequests.map((request) => {
            const chipClass = (request.status || '').replace(' ', '').toLowerCase()
            const isMessaging = messageTarget === request._id

            return (
              <article key={request._id} className="request-card">
                <div className="request-header">
                  <div>
                    <h3>{request.customer || 'Customer'}</h3>
                    <p>{request.service || 'Service'}</p>
                  </div>
                  <span className={`status-pill ${chipClass}`}>
                    {request.status}
                  </span>
                </div>

                <div className="request-meta">
                  <span>Date: {request.datetime ? new Date(request.datetime).toLocaleDateString() : 'N/A'}</span>
                  <span>Time: {request.datetime ? new Date(request.datetime).toLocaleTimeString() : 'N/A'}</span>
                </div>

                <div className="request-actions">
                  {/* Mark job as completed */}
                  <button
                    type="button"
                    className="btn-primary-solid"
                    onClick={() => markProviderRequestCompleted(request._id)}
                  >
                    Mark Completed
                  </button>

                  {/* Toggle mini message box */}
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setMessageTarget(isMessaging ? null : request._id)}
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
