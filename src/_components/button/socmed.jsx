import { useEffect, useState } from 'react'
import Tooltip from '@components/alert/tooltip'
import { getSocial } from '@api/settings'

const Index = ({ className = '', placement = 'auto' }) => {
  const [social, setSocial] = useState([
    { key: 'instagram', name: 'Instagram', src: require('@images/brands/instagram.svg').default },
    { key: 'facebook', name: 'Facebook', src: require('@images/brands/facebook.svg').default },
    { key: 'youtube', name: 'Youtube', src: require('@images/brands/youtube.svg').default },
    { key: 'twitter', name: 'Twitter', src: require('@images/brands/twitter.svg').default },
    { key: 'email', name: 'Email', src: require('@images/brands/gmail.svg').default },
    { key: 'linkedin', name: 'Linked-In', src: require('@images/brands/linkedin.svg').default },
  ])
  useEffect(() => {
    getSocial().then(({ data }) => {
      setSocial((prev) => {
        const res = prev?.map((m) => {
          const item = data?.find(({ name }) => name === m?.key)
          if (item?.url) {
            if (item?.name === 'email') {
              m.url = `https://mail.google.com/mail/?view=cm&fs=1&to=${item?.url}&su=&body=&cc=&bcc=`
            } else {
              m.url = item?.url
            }
          }
          return m
        })
        return res
      })
    })
  }, [])
  return (
    <div className={`flex-center ${className}`} style={{ padding: '0.25rem 0' }}>
      {social?.map(({ src, key, name, url }, index) => (
        <Tooltip key={index} title={name} placement={placement} className='fs-9 opacity-75'>
          <a
            href={url}
            target='_blank'
            className={`same-30px mx-1 my-2 flex-center radius-50`}
            style={{ background: 'rgba(255,255,255,0.75)' }}
            rel='noreferrer'
          >
            <div
              className={`position-relative pointer ${
                key === 'youtube' ? 'same-25px' : 'same-20px'
              }`}
              style={{ background: `url(${src}) center / cover no-repeat` }}
            />
          </a>
        </Tooltip>
      ))}
    </div>
  )
}

export default Index
