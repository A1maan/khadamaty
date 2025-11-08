/* this is the master router wiring every page and role together */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import LandingPage from './pages/LandingPage/LandingPage'
import SignUpCustomer from './pages/Auth/SignUpCustomer'
import SignUpProvider from './pages/Auth/SignUpProvider'
import SignUpSelection from './pages/Auth/SignUpSelection'
import SignIn from './pages/Auth/SignIn'
import OTPVerification from './pages/Auth/OTPVerification'
import SignUpCustomerError from './pages/Auth/SignUpCustomerError'
import SignUpProviderError from './pages/Auth/SignUpProviderError'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'
import CustomerDashboard from './pages/Customer/CustomerDashboard'
import CustomerActive from './pages/Customer/CustomerActive'
import CustomerPast from './pages/Customer/CustomerPast'
import CustomerSaved from './pages/Customer/CustomerSaved'
import CustomerBrowse from './pages/Customer/CustomerBrowse'
import CustomerBrowseFilter from './pages/Customer/CustomerBrowseFilter'
import CustomerCategory from './pages/Customer/CustomerCategory'
import CustomerBooking from './pages/Customer/CustomerBooking'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminUsersProviders from './pages/Admin/AdminUsersProviders'
import AdminUsersCustomers from './pages/Admin/AdminUsersCustomers'
import AdminUsersAdmins from './pages/Admin/AdminUsersAdmins'
import ProviderServices from './pages/Provider/ProviderServices'
import ProviderServiceForm from './pages/Provider/ProviderServiceForm'
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
        <Route path="/signup/customer/error" element={<SignUpCustomerError />} />
        <Route path="/signup/provider/error" element={<SignUpProviderError />} />
        <Route path="/signin" element={<SignIn role="customer" />} />
        <Route path="/signin/provider" element={<SignIn role="provider" />} />
        <Route path="/signin/admin" element={<SignIn role="admin" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        
        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/browse" element={<CustomerBrowse />} />
        <Route path="/customer/browse/filter" element={<CustomerBrowseFilter />} />
        <Route path="/customer/browse/:categoryId" element={<CustomerCategory />} />
        <Route path="/customer/booking/:providerId" element={<CustomerBooking />} />
        <Route path="/customer/active" element={<CustomerActive />} />
        <Route path="/customer/past" element={<CustomerPast />} />
        <Route path="/customer/saved" element={<CustomerSaved />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/providers" element={<AdminUsersProviders />} />
        <Route path="/admin/users/customers" element={<AdminUsersCustomers />} />
        <Route path="/admin/users/admins" element={<AdminUsersAdmins />} />
        
        {/* Service Provider Routes */}
        <Route path="/provider/services" element={<ProviderServices />} />
        <Route path="/provider/services/new" element={<ProviderServiceForm mode="create" />} />
        <Route path="/provider/services/:serviceId/edit" element={<ProviderServiceForm mode="edit" />} />
        <Route path="/provider/pending" element={<PendingRequests />} />
        <Route path="/provider/active" element={<ActiveRequests />} />
        <Route path="/provider/past" element={<PastRequests />} />
        <Route path="/provider/reviews" element={<MyReviews />} />
      </Routes>
    </Router>
  )
}

export default App
