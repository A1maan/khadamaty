import Sidebar from '../../components/Sidebar/Sidebar'
import { providerReviews } from '../../data/providerData'
import './Provider.css'

const MyReviews = () => (
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
          <input type="text" placeholder="Search reviews" />
        </div>
      </div>

      <div className="reviews-list">
        {providerReviews.map((review) => (
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
            </div>

            <button className="btn-ghost">Respond</button>
          </article>
        ))}
      </div>
    </main>
  </div>
)

export default MyReviews
