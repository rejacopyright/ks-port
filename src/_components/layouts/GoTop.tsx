import { FC, useEffect, useState } from 'react'

const GoTop: FC<any> = () => {
  const [thePosition, setThePosition] = useState<any>(false)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        setThePosition(true)
      } else {
        setThePosition(false)
      }
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <div
      className={`go-top bg-primary text-white ${thePosition ? 'active' : ''}`}
      onClick={scrollToTop}
    >
      <i className='las la-arrow-up' />
    </div>
  )
}

export default GoTop
