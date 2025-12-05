/* Provider queue — view pending requests and accept or decline them */
import { useMemo, useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { fetchPendingRequests, updateProviderRequestStatus } from '../../api/provider'
import './Provider.css'

const PendingRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Local UI state for decline flow
  const [selectedRequest, setSelectedRequest] = useState(null) // request being declined
  const [declineReason, setDeclineReason] = useState('schedule')
  const [declineNotes, setDeclineNotes] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const loadRequests = async () => {
    try {
      const providerId = localStorage.getItem('providerId')
      if (!providerId) {
        setError('Provider ID not found')
        setLoading(false)
        return
      }
      const data = await fetchPendingRequests(providerId)
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

  // Filter by customer or service name
  const filteredRequests = useMemo(() => {
    if (!searchTerm.trim()) return requests
    const normalized = searchTerm.trim().toLowerCase()
    return requests.filter((request) =>
      // Check if customer/service exist before accessing properties to avoid crashes
      `${request.customer || 'Unknown'} ${request.service || 'Unknown'}`.toLowerCase().includes(normalized)
    )
  }, [requests, searchTerm])

  // Open decline modal with default reason + cleared notes
  const openDeclineModal = (request) => {
    setSelectedRequest(request)
    setDeclineReason('schedule')
    setDeclineNotes('')
  }

  // Close modal without action
  const closeModal = () => {
    setSelectedRequest(null)
  }

  // Confirm decline, send data back to context, then close
  const handleSubmitDecline = async () => {
    if (!selectedRequest) return
    try {
      await updateProviderRequestStatus(selectedRequest._id, 'cancelled')
      await loadRequests() // Refresh list
      closeModal()
    } catch (err) {
      console.error('Failed to decline request:', err)
      alert('Failed to decline request')
    }
  }

  const handleAccept = async (requestId) => {
    try {
      await updateProviderRequestStatus(requestId, 'active')
      await loadRequests() // Refresh list
    } catch (err) {
      console.error('Failed to accept request:', err)
      alert('Failed to accept request')
    }
  }

  // Reasons shown as selectable chips
  const declineReasons = [
    { id: 'schedule', label: 'Scheduling conflict' },
    { id: 'scope', label: 'Outside service scope' },
    { id: 'location', label: 'Location not covered' },
    { id: 'other', label: 'Other' },
  ]

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />

      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Requests</p>
            <h2>Pending Requests</h2>
          </div>

          {/* Search bar for filtering pending items */}
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Search requests"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <section className="provider-cards">
          {loading && <div className="content-placeholder">Loading requests...</div>}
          {error && <div className="content-placeholder error">{error}</div>}

          {/* Empty state */}
          {!loading && !error && filteredRequests.length === 0 && (
            <div className="content-placeholder">No pending requests right now.</div>
          )}

          {/* Render each pending request */}
          {filteredRequests.map((request) => (
            <article key={request._id} className="request-card">
              <div className="request-header">
                <div>
                  <h3>{request.customer || 'Customer'}</h3>
                  <p>{request.service || 'Service'}</p>
                </div>
                <span className="status-pill pending">Awaiting Response</span>
              </div>

              <div className="request-meta">
                <span>Date: {request.datetime ? new Date(request.datetime).toLocaleDateString() : 'N/A'}</span>
                <span>Time: {request.datetime ? new Date(request.datetime).toLocaleTimeString() : 'N/A'}</span>
                <span>Notes: {request.notes}</span>
              </div>

              <div className="request-actions">
                <button className="btn-primary-solid" onClick={() => handleAccept(request._id)}>
                  ACCEPT
                </button>
                <button type="button" className="btn-ghost" onClick={() => openDeclineModal(request)}>
                  DECLINE
                </button>
              </div>
            </article>
          ))}
        </section>

        {selectedRequest && (
          // Decline modal mirrors Figma flow
          <div className="provider-modal-backdrop" role="dialog" aria-modal="true">
            <div className="provider-modal">
              <div className="modal-header">
                <div>
                  <p className="eyebrow">Decline Request</p>
                  <h3>{selectedRequest.customer}</h3>
                  <p className="modal-subtitle">{selectedRequest.service}</p>
                </div>
                <button type="button" className="modal-close" onClick={closeModal}>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>

              <div className="modal-body">
                <span className="modal-label">Select a reason</span>

                <div className="modal-reasons">
                  {declineReasons.map((reason) => (
                    <label
                      key={reason.id}
                      className={`reason-chip ${declineReason === reason.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="declineReason"
                        value={reason.id}
                        checked={declineReason === reason.id}
                        onChange={(event) => setDeclineReason(event.target.value)}
                      />
                      <span>{reason.label}</span>
                    </label>
                  ))}
                </div>

                <label className="modal-label" htmlFor="decline-notes">
                  Add context (optional)
                </label>
                <textarea
                  id="decline-notes"
                  rows="4"
                  value={declineNotes}
                  onChange={(event) => setDeclineNotes(event.target.value)}
                  placeholder="Let the customer know why this request was declined."
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={closeModal}>
                  Keep Request
                </button>
                <button type="button" className="btn-primary-solid" onClick={handleSubmitDecline}>
                  Submit Decline
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default PendingRequests
