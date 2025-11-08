/* this tiny banner shows toast messages coming from the mock store */
import { useMockData } from '../../context/MockDataContext'
import './Toast.css'

const GlobalToast = () => {
  const { flashMessage, clearToast } = useMockData()

  if (!flashMessage) return null

  return (
    <div className="toast-banner" role="status">
      <span>{flashMessage}</span>
      <button type="button" onClick={clearToast} aria-label="Dismiss notification">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
  )
}

export default GlobalToast
