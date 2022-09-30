const Index = ({ data = [] }) => {
  return (
    <div className='shadow radius-5 overflow-hidden'>
      <div className='text-center fw-500 fs-8 border-bottom border-ee bg-primary text-white py-2'>
        Halaman Paling Sering Dikunjungi Dalam 1 Bulan Terakhir
      </div>
      <table className='table table-middle table-stripeds m-0'>
        <thead>
          <tr>
            <th className='fw-600 fs-9 text-uppercase'>URL</th>
            <th className='fw-600 fs-9 text-uppercase text-center'>Views</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ url, pageViews }, index) => (
            <tr key={index}>
              <td className='text-dark fs-9'>
                <div className='word-break text-truncate-1'>{url}</div>
              </td>
              <td className='text-dark w-50px fs-9 text-center'>{pageViews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Index
