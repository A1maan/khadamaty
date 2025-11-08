/* provider review center so they can search comments and reply */
import { useMemo, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useMockData } from '../../context/MockDataContext'
import './Provider.css'

const MyReviews = () => {
  const { providerData, respondToReview } = useMockData()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeResponse, setActiveResponse] = useState(null)
  const [responseText, setResponseText] = useState('')

  const filteredReviews = useMemo(() => {
    if (!searchTerm.trim()) return providerData.reviews
    const normalized = searchTerm.trim().toLowerCase()
    return providerData.reviews.filter((review) =>
      `${review.customer} ${review.service}`.toLowerCase().includes(normalized)
    )
  }, [providerData.reviews, searchTerm])

  const handleRespond = (review) => {
    setActiveResponse(review.id)
    setResponseText(review.response ?? '')
  }

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
          {filteredReviews.length === 0 && (
            <div className="content-placeholder">No reviews match your search.</div>
          )}

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
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <ion-icon key={i} name={i < review.rating ? 'star' : 'star-outline'}></ion-icon>
                      ))}
                    </div>
                  </div>
                  <p className="review-date">{review.date}</p>
                  <p className="review-comment">{review.comment}</p>
                  {review.response && !isResponding && (
                    <p className="review-response">Your reply: {review.response}</p>
                  )}
                </div>

                <button type="button" className="btn-ghost" onClick={() => handleRespond(review)}>
                  {isResponding ? 'Close' : review.response ? 'Edit Response' : 'Respond'}
                </button>
                {isResponding && (
                  /* inline response box keeps the reviewer context visible */
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
