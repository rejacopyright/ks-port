import '@styles/_froala.scss'

import { getServices } from '@api/services'
import { CardLoader } from '@components/loader'
import { Modal } from '@components/modal'
import { htmlToString, toCapitalize } from '@helpers'
import defaultImage from '@images/placeholder-image.jpg'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Provider from './Provider'

const Index: FC<any> = () => {
  const { scope = 'general' } = useParams()
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<any>(false)
  const [detail, setDetail] = useState<any>({})
  const [howToOrderDetail, setHowToOrderDetail] = useState<any>()
  const [showModalDetail, setShowModalDetail] = useState<any>(false)
  useEffect(() => {
    setLoading(true)
    getServices({ type: scope })
      .then(({ data: { data } = {}, data: dataObj }) => {
        if (scope === 'how-to-order') {
          setHowToOrderDetail(dataObj)
        }
        setData(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [scope])

  return (
    <Provider>
      {false && <div className='fs-4 fw-500 mb-2'>{toCapitalize(scope)} Services</div>}
      {loading ? (
        <div className='mt-3'>
          <CardLoader className='col-md-6 col-lg-4 mb-3' />
        </div>
      ) : (
        <div className='row mt-2'>
          {scope !== 'how-to-order' ? (
            data?.map((m: any, index: any) => (
              <div key={index} className='col-md-6 col-lg-4 mb-3'>
                <div
                  className='d-flex p-2 shadow-sm hover-md radius-10 pointer'
                  onClick={() => {
                    setDetail(m)
                    setShowModalDetail(true)
                  }}
                >
                  <div
                    className='position-relative same-65px me-2 rounded'
                    style={{
                      background: `url(${m?.file || defaultImage}) center / cover no-repeat`,
                    }}
                  />
                  <div className='col overflow-hidden'>
                    <div className='fw-500 fs-7 text-capitalize text-truncate-1'>{m?.title}</div>
                    <div className='fs-8 text-truncate-2 text-aa'>
                      {htmlToString(m?.description)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className='w-100 overflow-autos'
              dangerouslySetInnerHTML={{ __html: howToOrderDetail?.description || '' }}
            />
          )}
        </div>
      )}

      {/* Modal Detail */}
      <Modal
        size='lg'
        theme='danger'
        bodyClass='p-0'
        show={showModalDetail}
        setShow={setShowModalDetail}
        title={`Detail Assets`}
        buttonText='Detail'
        header={false}
        footer={false}
        onHide={() => setDetail({})}
      >
        <div className='d-flex w-100'>
          <div
            className='position-relative d-none d-lg-block same-300px me-2'
            style={{
              background: `url(${detail?.file || defaultImage}) center / cover no-repeat`,
            }}
          />
          <div className='p-2 col-12 col-lg h-300px overflow-auto'>
            <div className='fs-6 fw-500 mb-2'>{detail?.title}</div>
            <div
              className='w-100 overflow-auto'
              dangerouslySetInnerHTML={{ __html: detail?.description }}
            />
          </div>
        </div>
      </Modal>
    </Provider>
  )
}
export default Index
