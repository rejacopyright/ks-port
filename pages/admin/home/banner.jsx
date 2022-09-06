import Image from 'next/image'

export const getServerSideProps = async () => {
  return {
    props: {
      data: [
        { name: 'Crew Change', src: require('@images/banner1.jpg').default },
        { name: 'Ship Charter', src: require('@images/banner2.jpg').default },
        { name: 'Ship Emergency Call', src: require('@images/banner3.jpg').default },
        { name: 'Fuel Bunkering', src: require('@images/banner4.jpg').default },
        { name: 'Shore Connection', src: require('@images/banner5.jpg').default },
        { name: 'Ship Repair', src: require('@images/banner6.jpg').default },
        { name: 'Waste Management', src: require('@images/banner7.jpg').default },
      ],
    },
  }
}

const Index = (props) => {
  const { data } = props || {}
  return (
    <div className='row'>
      {data?.map(({ name, src }, index) => (
        <div className='col-lg-4 col-md-6 my-3' key={index}>
          <div className='position-relative'>
            <div className='position-relative h-150px shadow-md-bold hover-xs radius-10 overflow-hidden p-2'>
              <Image priority quality={30} alt='img' layout='fill' objectFit='cover' src={src} />
              <div className='absolute-center z-2 flex-center w-100 h-100 hover-anim dark'>
                <div className='flex-center p-2 p-md-4'>
                  <div className='btn btn-sm mx-1 flex-center btn-light-warning text-warning same-25px radius-50'>
                    <i className='las la-pencil-alt fs-6' />
                  </div>
                  <div className='btn btn-sm mx-1 flex-center btn-light-danger text-danger same-25px radius-50'>
                    <i className='las la-trash-alt fs-6' />
                  </div>
                  <div className='btn btn-sm mx-1 flex-center btn-light-success text-success same-25px radius-50'>
                    <i className='las la-check fs-6' />
                  </div>
                </div>
              </div>
              <div
                className='position-absolute bottom-0 start-0 w-100 p-2 text-center fs-9 fw-500 text-white pointer mt-2'
                style={{ background: '#00000055' }}
              >
                {name}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='col-lg-4 col-md-6 my-3'>
        <div className='flex-center h-150px bg-light-primary text-primary fw-500 border border-dd border-dashed radius-15'>
          <div className='btn btn-sm btn-primary text-white'>Add Banner</div>
        </div>
      </div>
    </div>
  )
}

export default Index
