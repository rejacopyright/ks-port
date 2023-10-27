import debounce from 'lodash/debounce'
import { FC, useEffect, useState } from 'react'

export const useSize = (func: any, timeout: any) => {
  useEffect(() => {
    const updateSize = debounce(func, timeout || 100)
    updateSize()
    window?.addEventListener('resize', updateSize)
    return () => window?.removeEventListener('resize', updateSize)
  }, [func, timeout])
}

export const Sticky: FC<any> = ({ children }) => {
  const [top, setTop] = useState<any>(0)
  useSize(() => {
    // const headerHeight = document?.getElementById('topbarUser')?.offsetHeight || 0
    const navbarHeight = document?.getElementById('navbarUser')?.clientHeight || 0
    setTop(navbarHeight + 50)
  }, 100)
  return (
    <div className='position-sticky w-100' style={{ zIndex: 8, top }}>
      {children}
    </div>
  )
}

export const StickyAdmin: FC<any> = ({ children }) => {
  const [top, setTop] = useState<any>(0)
  useSize(() => {
    // const headerHeight = document?.getElementById('topbarUser')?.offsetHeight || 0
    const navbarHeight = document?.getElementById('navbarAdmin')?.clientHeight || 0
    setTop(navbarHeight + 2)
  }, 100)
  return (
    <div className='position-sticky w-100' style={{ zIndex: 8, top }}>
      {children}
    </div>
  )
}
