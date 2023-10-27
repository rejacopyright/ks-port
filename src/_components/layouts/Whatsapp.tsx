import { getContact } from '@api/settings'
import { FC, useEffect, useState } from 'react'

const Index: FC<any> = () => {
  const [thePosition, setThePosition] = useState<any>(false)
  const [animate, setAnimate] = useState<any>(false)
  const [detail, setDetail] = useState<any>({})

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        setThePosition(true)
      } else {
        setThePosition(false)
      }
    })

    getContact().then(({ data }) => {
      setDetail(data)
    })
  }, [])

  return (
    <div
      className='position-fixed'
      style={{ right: '1.25rem', bottom: thePosition ? '5rem' : '2rem' }}
    >
      <a
        href={`https://wa.me/62${detail?.whatsapp}`}
        target='_blank'
        className={`btn btn-success btn-sm same-50px flex-center radius-50 shadow-sm-bold ${
          animate ? 'animate__animated animate__wobble animate__faster' : ''
        }`}
        onMouseEnter={() => setAnimate(true)}
        onMouseLeave={() => setAnimate(false)}
        rel='noreferrer'
      >
        <i className='lab la-whatsapp fs-2 text-white' />
      </a>
    </div>
  )
}

export default Index
