const Index = () => {
  return (
    <div className='row'>
      <div className='col-12'>
        <h5>This page is protected</h5>
        {Array(50)
          .fill('')
          .map((_m, index) => (
            <p key={index}>{index + 1} Lorem ipsum dolor sit amet.</p>
          ))}
      </div>
    </div>
  )
}
export default Index
