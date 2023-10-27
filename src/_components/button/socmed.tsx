import { getSocial } from '@api/settings'
import Tooltip from '@components/alert/tooltip'
import { FC, useEffect, useState } from 'react'

const Index: FC<any> = ({ className = '', placement = 'auto' }) => {
  const [social, setSocial] = useState<any>([
    { key: 'instagram', name: 'Instagram', src: require('@images/brands/instagram.svg').default },
    { key: 'facebook', name: 'Facebook', src: require('@images/brands/facebook.svg').default },
    { key: 'youtube', name: 'Youtube', src: require('@images/brands/youtube.svg').default },
    { key: 'twitter', name: 'Twitter', src: require('@images/brands/twitter.svg').default },
    { key: 'email', name: 'Email', src: require('@images/brands/gmail.svg').default },
    { key: 'linkedin', name: 'Linked-In', src: require('@images/brands/linkedin.svg').default },
  ])
  useEffect(() => {
    getSocial().then(({ data }) => {
      setSocial((prev: any) => {
        const res = prev?.map((m: any) => {
          const item: any = data?.find(({ name }: any) => name === m?.key)
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
      {social
        ?.filter(({ url }: any) => url)
        ?.map(({ src, key, name, url }: any, index: number) => (
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
