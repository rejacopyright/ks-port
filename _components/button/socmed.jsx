import Image from 'next/image'
import Tooltip from '@components/alert/tooltip'
// IMAGES
const social = [
  { key: 'instagram', name: 'Instagram', src: require('@images/brands/instagram.svg').default },
  { key: 'facebook', name: 'Facebook', src: require('@images/brands/facebook.svg').default },
  { key: 'youtube', name: 'Youtube', src: require('@images/brands/youtube.svg').default },
  { key: 'twitter', name: 'Twitter', src: require('@images/brands/twitter.svg').default },
  { key: 'gmail', name: 'Email', src: require('@images/brands/gmail.svg').default },
  { key: 'linkedin', name: 'Linked-In', src: require('@images/brands/linkedin.svg').default },
]

const Index = ({ className = '', placement = 'auto' }) => {
  return (
    <div className={`flex-center ${className}`} style={{ padding: '0.25rem 0' }}>
      {social?.map(({ src, key, name }, index) => (
        <Tooltip key={index} title={name} placement={placement} className='fs-9 opacity-75'>
          <div
            className={`same-30px mx-1 my-2 flex-center radius-50`}
            style={{ background: 'rgba(255,255,255,0.75)' }}
          >
            <div
              className={`position-relative pointer ${
                key === 'youtube' ? 'same-25px' : 'same-20px'
              }`}
            >
              <Image quality={10} alt='img' layout='fill' objectFit='cover' src={src} />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

export default Index
