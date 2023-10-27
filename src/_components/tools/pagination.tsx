import { FC, useEffect, useState } from 'react'

const Generate: any = (n: any, f: any) => {
  return Array(n)
    ?.fill('')
    ?.map((_v: any, i: any) => (f || 1) + i)
}
const Index: FC<any> = ({
  total = 0,
  limit = 0,
  page = 1,
  showLimit = true,
  className = '',
  onChangePage = () => '',
  onChangeLimit = () => '',
}) => {
  const [currentPage, setCurrentPage] = useState<any>(1)
  useEffect(() => {
    setCurrentPage(parseInt(page) || 1)
  }, [page])

  const end: any = currentPage * limit
  const start: any = currentPage === 1 ? 1 : end + 1 - limit
  const lastPage: any = Math.ceil(total / limit) || 0
  const pageChange: any = (key: any) => {
    onChangePage(key)
    setCurrentPage(key)
  }
  const configClass = {
    btn: 'btn btn-icon d-flex align-items-center justify-content-center overflow-hidden radius-50 fs-7 fw-boldest w-30px h-30px',
    active: 'btn-primary text-white',
    inActive: 'btn-light-primary',
  }

  return (
    <div className={className}>
      <div className='row align-items-center'>
        {showLimit && (
          <div className='fs-6 fw-bold text-gray-700 col-auto pt-5'>
            <select
              className='form-select form-select-sm'
              name='number_of_page'
              style={{ width: '80px', marginRight: '10px' }}
              onChange={({ target: { value } }) => {
                onChangeLimit(parseInt(value))
                setCurrentPage(1)
              }}
            >
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='75'>75</option>
              <option value='100'>100</option>
            </select>
          </div>
        )}
        <div className={`col ${lastPage <= 1 ? 'd-none' : 'd-block'}`}>
          <div className={`row flex-nowrap m-0 justify-content-${showLimit ? 'end' : 'center'}`}>
            {((lastPage > 10 && currentPage >= 7) || (lastPage === 11 && currentPage === 6)) && (
              <>
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(1)}
                    className={`${configClass.btn} ${
                      currentPage === 1 ? configClass.active : configClass.inActive
                    }`}
                  >
                    1
                  </button>
                </div>
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(2)}
                    className={`${configClass.btn} ${
                      currentPage === 2 ? configClass.active : configClass.inActive
                    }`}
                  >
                    2
                  </button>
                </div>
                <div className='col-auto px-0'>
                  <span className={`${configClass.btn} overflow-hidden fs-7 fw-400`}>...</span>
                </div>
              </>
            )}
            {lastPage > 10 && currentPage >= 7 && currentPage < lastPage - 5
              ? Generate(7, currentPage - 3).map((key: any) => (
                  <div className='col-auto px-1' key={key}>
                    <button
                      type='button'
                      onClick={() => pageChange(key)}
                      className={`${configClass.btn} ${
                        currentPage === key ? configClass.active : configClass.inActive
                      }`}
                    >
                      {key}
                    </button>
                  </div>
                ))
              : lastPage > 10 && currentPage >= lastPage - 5
              ? Generate(5, lastPage - 6).map((key: any) => (
                  <div className='col-auto px-1' key={key}>
                    <button
                      type='button'
                      onClick={() => pageChange(key)}
                      className={`${configClass.btn} ${
                        currentPage === key ? configClass.active : configClass.inActive
                      }`}
                    >
                      {key}
                    </button>
                  </div>
                ))
              : Generate(lastPage > 10 ? 7 : lastPage).map((key: any) => (
                  <div className='col-auto px-1' key={key}>
                    <button
                      type='button'
                      onClick={() => pageChange(key)}
                      className={`${configClass.btn} ${
                        currentPage === key ? configClass.active : configClass.inActive
                      }`}
                    >
                      {key}
                    </button>
                  </div>
                ))}
            {lastPage > 10 && (
              <>
                {currentPage < lastPage - 5 && (
                  <div className='col-auto px-0'>
                    <span className={`${configClass.btn} overflow-hidden fs-7 fw-400`}>...</span>
                  </div>
                )}
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(lastPage - 1)}
                    className={`${configClass.btn} ${
                      currentPage === lastPage - 1 ? configClass.active : configClass.inActive
                    }`}
                  >
                    {lastPage - 1}
                  </button>
                </div>
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(lastPage)}
                    className={`${configClass.btn} ${
                      currentPage === lastPage ? configClass.active : configClass.inActive
                    }`}
                  >
                    {lastPage}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {showLimit && (
          <div className='col-12'>
            <span className='text-gray-700' style={{ position: 'relative', top: '5px' }}>
              Showing <span className='fw-bolder text-dark'>{start}</span> to{' '}
              <span className='fw-bolder text-dark'>{total < end ? total.toString() : end}</span> of{' '}
              <span className='fw-bolder text-dark'>{total.toString()}</span> entries
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
