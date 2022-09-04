import Meta from '@components/seo/meta'
import Banner from '@components/banner'

const Index = () => {
  return (
    <>
      <Meta title='Tata Kelola' description={undefined} />
      <Banner />
      <div className='container'>
        <div className='flex-center vh-60'>
          <div className='text-center'>
            <div className='fs-3 fw-500'>Tata Kelola</div>
            <div className=''>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, beatae!
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Index
