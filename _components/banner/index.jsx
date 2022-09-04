import Image from 'next/image'
import defaultBanner from '@images/banner.jpg'
const Index = () => {
  return (
    <div className='position-relative h-200px'>
      <Image alt='img' quality={100} layout='fill' objectFit='cover' src={defaultBanner} />
    </div>
  )
}
export default Index
