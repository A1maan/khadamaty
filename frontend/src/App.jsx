import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import LandingPage from './pages/LandingPage/LandingPage'
import SignUpCustomer from './pages/Auth/SignUpCustomer'
import SignUpProvider from './pages/Auth/SignUpProvider'
import SignUpSelection from './pages/Auth/SignUpSelection'
import SignIn from './pages/Auth/SignIn'
import OTPVerification from './pages/Auth/OTPVerification'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'
import CustomerDashboard from './pages/Customer/CustomerDashboard'
import CustomerActive from './pages/Customer/CustomerActive'
import CustomerPast from './pages/Customer/CustomerPast'
import CustomerSaved from './pages/Customer/CustomerSaved'
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
        <Route path="/signup/provider" element={<SignUpProvider />} />
        <Route path="/signup/selection" element={<SignUpSelection />} />
        <Route path="/signup/verify" element={<OTPVerification />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        
        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/active" element={<CustomerActive />} />
        <Route path="/customer/past" element={<CustomerPast />} />
        <Route path="/customer/saved" element={<CustomerSaved />} />
        
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
