import Image from 'next/image'
import defaultBanner from '@images/banner.jpg'
const Index = ({
  height = 200,
  src = defaultBanner,
  content = undefined,
  style = { background: 'rgba(0,0,0,0.5)' },
}) => {
  return (
    <div className={`position-relative h-${height}px`}>
      <Image priority alt='img' quality={100} layout='fill' objectFit='cover' src={src} />
      {content && (
        <div className='position-absolute flex-center w-100 h-100 text-white' style={style}>
          {typeof content === 'function' ? content() : content}
        </div>
      )}
    </div>
  )
}
export default Index
