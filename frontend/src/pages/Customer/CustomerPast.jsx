/* history tab for customers with rebook + review inline widgets */
import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './CustomerPages.css'

const CustomerPast = () => {
  const { customerRequests, providerMap, rebookPastRequest, submitCustomerReview } = useMockData()
  const { pastRequests } = customerRequests
  const [reviewTarget, setReviewTarget] = useState(null)
  const [reviewForm, setReviewForm] = useState({ rating: 5, feedback: '' })

  const startReview = (request) => {
    setReviewTarget(request.id)
    setReviewForm({ rating: request.rating || 5, feedback: request.feedback ?? '' })
  }

  const handleReviewSubmit = (event) => {
    event.preventDefault()
    if (!reviewTarget) return
    submitCustomerReview(reviewTarget, reviewForm)
    setReviewTarget(null)
    setReviewForm({ rating: 5, feedback: '' })
  }

  return (
    <div className="customer-page">
      <Sidebar userType="customer" />
      <main className="customer-content">
        <header className="customer-hero">
          <div>
            <p className="eyebrow">History</p>
            <h1>Past Requests</h1>
            <p>Rebook trusted service providers or leave a review.</p>
          </div>
        </header>

        <section className="provider-list">
          {pastRequests.length === 0 && (
            <div className="empty-state">
              <ion-icon name="time-outline"></ion-icon>
              <p>No past bookings. Once you complete a service it will show here.</p>
            </div>
          )}

          {pastRequests.map((req) => {
            const provider = providerMap[req.providerId]
            const isReviewing = reviewTarget === req.id
            return (
              <article key={req.id} className="provider-row">
                <div className="provider-avatar">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </div>
                <div className="provider-summary">
                  <h3>{provider?.name}</h3>
                  <p>{provider?.description}</p>
                  <div className="provider-meta">
                    <span>Completed: {req.completedOn}</span>
                    <span>Status: {req.status}</span>
                    <span>Rating: {req.rating} ★</span>
                  </div>
                </div>
                <div className="booking-actions">
                  <button type="button" className="btn-primary-solid" onClick={() => rebookPastRequest(req.id)}>
                    Rebook
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => startReview(req)}>
                    {isReviewing ? 'Close' : 'Leave Review'}
                  </button>
                </div>
                {isReviewing && (
                  /* quick inline form so users do not bounce to another page */
                  <form className="review-inline" onSubmit={handleReviewSubmit}>
                    <label>
                      Rating
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={reviewForm.rating}
                        onChange={(event) => setReviewForm((prev) => ({ ...prev, rating: Number(event.target.value) }))}
                      />
                    </label>
                    <label>
                      Feedback
                      <textarea
                        rows="3"
                        value={reviewForm.feedback}
                        onChange={(event) => setReviewForm((prev) => ({ ...prev, feedback: event.target.value }))}
                        placeholder="Share your experience"
                      ></textarea>
                    </label>
                    <button type="submit" className="btn-primary-solid compact">Submit Review</button>
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

export default CustomerPast
