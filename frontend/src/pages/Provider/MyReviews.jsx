import Sidebar from '../../components/Sidebar/Sidebar'
import './Provider.css'

const MyReviews = () => {
  const reviews = [
    {
      id: 1,
      customer: 'Customer Name',
      service: 'Service Name',
      rating: 5,
      date: 'XX/XX/XXXX',
      comment: 'Great service! Very professional and timely.'
    },
    {
      id: 2,
      customer: 'Customer Name',
      service: 'Service Name',
      rating: 4,
      date: 'XX/XX/XXXX',
      comment: 'Good work, would recommend.'
    },
  ]

  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      
      <main className="provider-content">
        <div className="provider-header">
          <h2>My Reviews</h2>
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder="search ..." />
          </div>
        </div>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <ion-icon name="person-circle-outline" className="review-avatar"></ion-icon>
              
              <div className="review-content">
                <div className="review-header">
                  <h4>{review.customer}</h4>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <ion-icon 
                        key={i} 
                        name={i < review.rating ? "star" : "star-outline"}
                      ></ion-icon>
                    ))}
                  </div>
                </div>
                <p className="review-service">{review.service}</p>
                <p className="review-date">Date: {review.date}</p>
                <p className="review-comment">{review.comment}</p>
              </div>

              <button className="btn-respond">RESPOND</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default MyReviews
