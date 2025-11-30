/* Provider review center — search reviews and add/edit public replies */
import { useMemo, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Provider.css'

const MyReviews = () => {
  // Pull review data + reply handler from context
  const { providerData, respondToReview } = useMockData()

  // Local state for searching + responding
  const [searchTerm, setSearchTerm] = useState('')
  const [activeResponse, setActiveResponse] = useState(null) // review being edited
  const [responseText, setResponseText] = useState('')        // reply text input

  // Search reviews by customer or service
  const filteredReviews = useMemo(() => {
    if (!searchTerm.trim()) return providerData.reviews
    const normalized = searchTerm.trim().toLowerCase()
    return providerData.reviews.filter((review) =>
      `${review.customer} ${review.service}`.toLowerCase().includes(normalized)
    )
  }, [providerData.reviews, searchTerm])

  // When clicking “Respond” or “Edit Response”
  const handleRespond = (review) => {
    setActiveResponse(review.id)
    setResponseText(review.response ?? '') // preload existing response if there is one
  }

  // Save reply (mock submit)
  const submitResponse = (event) => {
    event.preventDefault()
    if (!activeResponse) return
    respondToReview(activeResponse, responseText)
    setActiveResponse(null)
    setResponseText('')
  }

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      
      <main className="provider-content">
        <div className="provider-header">
          <div>
            <p className="eyebrow">Feedback</p>
            <h2>My Reviews</h2>
          </div>

          {/* Search bar for filtering reviews */}
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="Search reviews"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="reviews-list">
          {/* Empty-state message */}
          {filteredReviews.length === 0 && (
            <div className="content-placeholder">No reviews match your search.</div>
          )}

          {/* Each review card */}
          {filteredReviews.map((review) => {
            const isResponding = activeResponse === review.id

            return (
              <article key={review.id} className="review-card">
                <ion-icon name="person-circle-outline" className="review-avatar"></ion-icon>
                
                <div className="review-content">
                  <div className="review-header">
                    <div>
                      <h4>{review.customer}</h4>
                      <p className="review-service">{review.service}</p>
                    </div>

                    {/* Display star rating */}
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <ion-icon key={i} name={i < review.rating ? 'star' : 'star-outline'}></ion-icon>
                      ))}
                    </div>
                  </div>

                  <p className="review-date">{review.date}</p>
                  <p className="review-comment">{review.comment}</p>

                  {/* Show existing reply when not editing */}
                  {review.response && !isResponding && (
                    <p className="review-response">Your reply: {review.response}</p>
                  )}
                </div>

                {/* Reply button toggles response box */}
                <button type="button" className="btn-ghost" onClick={() => handleRespond(review)}>
                  {isResponding ? 'Close' : review.response ? 'Edit Response' : 'Respond'}
                </button>

                {/* Inline response box */}
                {isResponding && (
                  <form className="message-box" onSubmit={submitResponse}>
                    <textarea
                      rows="3"
                      value={responseText}
                      onChange={(event) => setResponseText(event.target.value)}
                      placeholder="Share a public reply"
                    ></textarea>
                    <button type="submit" className="btn-primary-solid compact">Save Response</button>
                  </form>
                )}
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default MyReviews

