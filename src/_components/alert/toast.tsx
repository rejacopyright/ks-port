import { toast, ToastOptions } from 'react-toastify'

interface ToastProps extends Omit<ToastOptions, 'type' | 'message'> {
  message?: any
  type?: 'success' | 'error' | 'warn' | 'warning' | 'info' | 'clear'
}

const config: ToastProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: true,
  progress: 0,
  theme: 'light',
  icon: true,
}

const Index = ({ type = 'info', message = 'Message' }: ToastProps, options?: ToastProps) => {
  switch (type) {
    case 'success':
      toast.success(message, { ...config, ...options } as any)
      break
    case 'error':
      toast.error(message, { ...config, ...options } as any)
      break
    case 'warn':
    case 'warning':
      toast.warn(message, { ...config, ...options } as any)
      break
    case 'info':
      toast.info(message, { ...config, ...options } as any)
      break
    default:
      toast(message, { ...config, ...options } as any)
  }
}

export default Index
