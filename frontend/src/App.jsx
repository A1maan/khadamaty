import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import LandingPage from './pages/LandingPage/LandingPage'
import SignUpCustomer from './pages/Auth/SignUpCustomer'
import SignUpSelection from './pages/Auth/SignUpSelection'
import OTPVerification from './pages/Auth/OTPVerification'
import CustomerDashboard from './pages/Customer/CustomerDashboard'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminUsers from './pages/Admin/AdminUsers'
import ProviderServices from './pages/Provider/ProviderServices'
import PendingRequests from './pages/Provider/PendingRequests'
import ActiveRequests from './pages/Provider/ActiveRequests'
import PastRequests from './pages/Provider/PastRequests'
import MyReviews from './pages/Provider/MyReviews'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpCustomer />} />
        <Route path="/signup/selection" element={<SignUpSelection />} />
        <Route path="/signup/verify" element={<OTPVerification />} />
        
        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        
        {/* Service Provider Routes */}
        <Route path="/provider/services" element={<ProviderServices />} />
        <Route path="/provider/pending" element={<PendingRequests />} />
        <Route path="/provider/active" element={<ActiveRequests />} />
        <Route path="/provider/past" element={<PastRequests />} />
        <Route path="/provider/reviews" element={<MyReviews />} />
      </Routes>
    </Router>
  )
}

export default App
