/* otp screen to mimic verifying email or phone */
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { verifyCustomerOtp } from '../../api/customer'
import './Auth.css'

const OTPVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // get email from navigation state or fallback
  const email = location.state?.email || 'your email'

  const handleOtpChange = (index, value) => {
    // making sure that the input is only digits and updating the otp state
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // this part is just checking if all the input boxes are not filled then whenever a user fills one of the input boxes, 
      // the focus should automatically move to the adjacent box on the right
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const readPendingCustomerId = () => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem('pendingCustomerId') ?? window.localStorage.getItem('customerId')
  }

  // if user is verified, navigate to the dashboard after confirming OTP with backend
  const handleVerify = async () => {
    const customerId = readPendingCustomerId()
    if (!customerId) {
      setErrorMessage('We could not find a pending signup. Please sign up again.')
      return
    }

    const code = otp.join('')
    if (code.length !== 6) {
      setErrorMessage('Please enter the 6-digit OTP.')
      return
    }

    try {
      setIsVerifying(true)
      setErrorMessage(null)
      await verifyCustomerOtp({ id: customerId, otp: Number(code) })
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('customerId', customerId)
        window.localStorage.removeItem('pendingCustomerId')
      }
      navigate('/customer/dashboard')
    } catch (error) {
      setErrorMessage(error.message ?? 'Verification failed. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="auth-page">
      <Header showSignUp={true} signUpText="Sign IN" signUpLink="/signin" />

      <main className="auth-main">
        <div className="otp-icon">
          <ion-icon name="mail-open-outline"></ion-icon>
        </div>

        <div className="otp-container">
          <div className="otp-card">
            <h2>OTP Verification</h2>

            <p className="otp-message">
              An OTP has been sent to the following email address:<br />
              <strong>{email}</strong>
            </p>

            {/*
            this is the actual input for the otp verification
            whenever a user types in a digit, it automatically switches to the next input box through the handleOtpChange function
            */}
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="otp-input"
                />
              ))}
            </div>

            {/*this part is not yet implemented since it requires the logic from the backend*/}
            <p className="resend-text">Resend in 30s</p>

            {errorMessage && <p className="form-feedback error">{errorMessage}</p>}

            <button className="btn-verify" onClick={handleVerify} disabled={isVerifying}>
              {isVerifying ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OTPVerification
