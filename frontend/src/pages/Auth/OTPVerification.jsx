/* otp screen to mimic verifying email or phone */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Auth.css'

const OTPVerification = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerify = () => {
    navigate('/customer/dashboard')
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
              <strong>Example@domain.com</strong>
            </p>

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

            <p className="resend-text">Resend in 30s</p>

            <button className="btn-verify" onClick={handleVerify}>
              Verify
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OTPVerification
