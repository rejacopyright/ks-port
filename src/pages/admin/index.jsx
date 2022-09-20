const Index = () => {
  return (
    <div className='row'>
      {Array(10)
        .fill('')
        .map((_m, index) => (
          <div className='col-lg-3 col-md-4 col-sm-6 mb-3' key={index}>
            <div className='p-3 shadow-sm hover-md pointer'>
              <div className='fw-400'>Card Title</div>
              <div className='fw-200'>Lorem ipsum dolor sit amet.</div>
            </div>
          </div>
        ))}
    </div>
  )
}
export default Index
