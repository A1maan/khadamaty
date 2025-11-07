import Sidebar from '../../components/Sidebar/Sidebar'
import './Provider.css'

const ProviderServices = () => {
  return (
    <div className="provider-page">
      <Sidebar userType="provider" />
      
      <main className="provider-content">
        <div className="provider-header">
          <h2>My Services</h2>
          <div className="search-bar">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder="search ..." />
          </div>
        </div>

        <div className="content-placeholder">
          <p>Service management coming soon...</p>
        </div>
      </main>
    </div>
  )
}

export default ProviderServices
