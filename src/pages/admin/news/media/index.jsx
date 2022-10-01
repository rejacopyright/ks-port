import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StickyAdmin } from '@helpers/hooks'
import { InputIcon } from '@components/form'
import { getMedia, deleteMedia } from '@api/news'
import defaultImage from '@images/placeholder-image.jpg'
import { htmlToString, strToSlug } from '@helpers'
import { CardLoader } from '@components/loader'
import { Modal } from '@components/modal'
import toast from '@components/alert/toast'
import Pagination from '@components/tools/pagination'
import qs from 'qs'

const Index = () => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const query = qs.parse(search, { ignoreQueryPrefix: true })
  const { page = 1 } = query
  const [data, setData] = useState([])
  const [meta, setMeta] = useState({ total: 0, limit: 0 })
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [detail, setDetail] = useState({})
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getMedia({ page, limit: 6 })
      .then(({ data: { data, total, per_page: limit } = {} }) => {
        setData(data)
        setMeta({ total, limit })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [reload, page])

  const handleDelete = () => {
    if (detail?.id) {
      setSaveLoading(true)
      deleteMedia(detail?.id)
        .then(({ data, response }) => {
          if (data?.success) {
            setShowModalDelete(false)
            setDetail({})
            setReload(!reload)
            toast({ type: 'success', message: data?.message })
          } else {
            toast({ type: 'error', message: response?.statusText })
          }
          setSaveLoading(false)
        })
        .finally(() => {
          setReload(!reload)
        })
    }
  }

  return (
    <>
      <StickyAdmin>
        <div className='bg-white shadow-sm rounded mx-n2 text-center mb-3'>
          <div className='row flex-start p-3'>
            <div className='col col-sm-6'>
              <InputIcon left='search' />
            </div>
            <div className='col-auto ms-auto'>
              <Link to='/admin/news/media/add'>
                <div className='btn fs-8 btn-primary text-white'>
                  <i className='las la-plus me-1' />
                  Create News
                </div>
              </Link>
            </div>
          </div>
        </div>
      </StickyAdmin>
      {loading ? (
        <div className='mt-4'>
          <CardLoader count={4} className='col-sm-6 col-lg-4 mb-4' />
        </div>
      ) : (
        <div className='row'>
          {data?.map(({ title, file, description, id }, index) => (
            <div key={index} className='col-sm-6 col-lg-4 mb-5 flex-column-reverse'>
              <div className='position-relative radius-10 overflow-hidden bg-white shadow-sm hover-lg-bold h-100'>
                <div
                  className='position-relative h-150px flex-center bg-white overflow-hidden'
                  style={{ background: `url(${file || defaultImage}) center / cover no-repeat` }}
                />
                <div className='p-3 w-100 mb-5'>
                  <div className='fs-8 fw-500 mb-2 text-truncate-2 text-capitalize'>{title}</div>
                  <div className='fs-9 fw-300 text-bb text-truncate-3'>
                    {htmlToString(description)}
                  </div>
                </div>
                <div className='absolute-center-h bottom-0 mb-3'>
                  <div className='flex-center'>
                    <a
                      href={`/news/media/${strToSlug(title)}?id=${id}`}
                      target='_blank'
                      className='btn btn-sm btn-light-primary fs-8 text-nowrap me-2'
                      rel='noreferrer'
                    >
                      View
                      <i className='las la-external-link-alt fs-6 ms-1' />
                    </a>
                    <Link to={`/admin/news/media/edit/${id}`}>
                      <div className='btn btn-sm btn-light-warning fs-8 text-nowrap'>
                        <i className='las la-pencil-alt me-1' />
                        Edit
                      </div>
                    </Link>
                  </div>
                </div>
                <div className='position-absolute top-0 end-0 p-2'>
                  <div
                    className='btn btn-sm flex-center same-20px bg-danger text-white radius-50'
                    onClick={() => {
                      setDetail({ id, title })
                      setShowModalDelete(true)
                    }}
                  >
                    <i className='las la-times' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='row'>
        <div className='col-12'>
          <Pagination
            className='mt-3 mb-5'
            limit={meta?.limit}
            showLimit={false}
            total={meta?.total}
            page={page}
            onChangePage={(e) => {
              navigate({ pathname, search: `?page=${e}` })
              setMeta((prev) => ({ ...prev, page: e }))
            }}
          />
        </div>
      </div>

      {/* Modal Delete */}
      <Modal
        size='md'
        theme='danger'
        show={showModalDelete}
        setShow={setShowModalDelete}
        title={`Delete Services`}
        loading={saveLoading}
        onSubmit={handleDelete}
        buttonText='Delete'
        onHide={() => setDetail({})}
      >
        <div className='w-100 text-center'>
          Are you sure want to remove <span className='fw-600'>&quot;{detail?.title}&quot;</span> ?
        </div>
      </Modal>
    </>
  )
}

export default Index
