import { toast } from 'react-toastify'

const Index = ({ type = 'info', message = 'Message' }) => {
  const config = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    icon: true,
  }
  switch (type) {
    case 'success':
      toast.success(message, config)
      break
    case 'error':
      toast.error(message, config)
      break
    case 'warning':
      toast.warn(message, config)
      break
    case 'info':
      toast.info(message, config)
      break
    default:
      toast(message, config)
  }
}

export default Index
