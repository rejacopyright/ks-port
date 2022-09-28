const Index = ({ data = [] }) => {
  return (
    <div className='shadow radius-5 overflow-hidden'>
      <div className='text-center fw-500 fs-8 border-bottom border-ee bg-primary text-white py-2'>
        Total Pengunjung 1 Bulan terakhir
      </div>
      <table className='table table-middle table-stripeds m-0'>
        <thead>
          <tr>
            <th className='fw-600 fs-10 text-uppercase'>Country</th>
            <th className='fw-600 fs-10 text-uppercase text-center'>Visitor</th>
            <th className='fw-600 fs-10 text-uppercase text-center'>Views</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ country, users, views }, index) => (
            <tr key={index}>
              <td className='text-primary'>{country}</td>
              <td className='text-primary text-center'>{users}</td>
              <td className='text-primary text-center'>{views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Index
