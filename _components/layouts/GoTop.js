import { useState, useEffect } from 'react'

const GoTop = () => {
  const [thePosition, setThePosition] = useState(false)

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
    <>
      <div
        className={`go-top bg-info text-white ${thePosition ? 'active' : ''}`}
        onClick={scrollToTop}
      >
        <i className='las la-arrow-up' />
      </div>
    </>
  )
}

export default GoTop
