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
      <div className='position-absolute flex-bottom pb-2 w-100 h-100 text-white' style={style}>
        {content && (
          <div className='animate__animated animate__wobble animate__faster'>
            {typeof content === 'function' ? content() : content}
          </div>
        )}
      </div>
    </div>
  )
}
export default Index
