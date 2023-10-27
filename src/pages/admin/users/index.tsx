import { deleteUser, getUsers } from '@api/users'
import toast from '@components/alert/toast'
import Tooltip from '@components/alert/tooltip'
import { InputIcon } from '@components/form'
import { ListLoader, SimpleLoader } from '@components/loader'
import { Modal } from '@components/modal'
import { StickyAdmin } from '@helpers'
import defaultImage from '@images/avatar.png'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { mapError } from 'src/_helpers/function'

import ModalAddEdit from './AddEdit'

const Index: FC<any> = () => {
  const user = useSelector(({ user }) => user)
  const { role_id } = user || {}

  const [data, setData] = useState<any>([])
  const [detail, setDetail] = useState<any>({})
  const [reload, setReload] = useState<any>(false)
  const [loading, setLoading] = useState<any>(false)
  const [showModalAddEdit, setShowModalAddEdit] = useState<any>(false)
  const [showModalDelete, setShowModalDelete] = useState<any>(false)
  const [saveLoading, setSaveLoading] = useState<any>(false)

  useEffect(() => {
    setLoading(true)
    getUsers()
      .then(({ data: { data } = {} }) => {
        setData(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [reload])

  const handleDelete = () => {
    if (detail?.id) {
      setSaveLoading(true)
      deleteUser(detail?.id)
        .then(({ data }) => {
          if (data?.success) {
            setShowModalDelete(false)
            setDetail({})
            setReload(!reload)
            toast({ type: 'success', message: data?.message })
          }
        })
        .catch((err) => {
          toast({
            type: 'error',
            message: (
              <ul className='ps-3 m-0'>
                {Object.values(mapError(err))?.map((message: any, index: any) => (
                  <li className='text-danger' key={index}>
                    {message}
                  </li>
                ))}
              </ul>
            ),
          })
        })
        .finally(() => {
          setSaveLoading(false)
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
            <div
              className='col-auto ms-auto'
              onClick={() => {
                setDetail({})
                setShowModalAddEdit(true)
              }}
            >
              <div className='btn fs-8 btn-primary text-white'>
                <i className='las la-plus me-1' />
                Add New User
              </div>
            </div>
          </div>
        </div>
      </StickyAdmin>
      {loading ? (
        <div className=''>
          <div className='w-100 mt-5 d-none d-sm-block'>
            <SimpleLoader count={4} height={25} className='col-sm-3' />
          </div>
          <div className='w-100 mt-4'>
            <ListLoader count={5} className='col-12 mb-3' />
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col-12 mt-3'>
            <div className='table-responsive'>
              <table className='table table-middle table-striped'>
                <thead>
                  <tr>
                    <th className='fw-600 text-center'>#</th>
                    <th className='fw-600'>Name</th>
                    <th className='fw-600'>Username</th>
                    <th className='fw-600'>Email</th>
                    {parseInt(role_id) === 1 && <th className='fw-600' />}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((m: any) => (
                    <tr key={m?.id}>
                      <td className='text-center'>
                        <div
                          className='same-30px position-relative border radius-50 mx-auto'
                          style={{
                            background: `#eee url(${
                              m?.avatar || defaultImage
                            }) center / cover no-repeat`,
                          }}
                        />
                      </td>
                      <td className=''>{m?.name}</td>
                      <td className=''>{m?.username}</td>
                      <td className=''>{m?.email}</td>
                      {parseInt(role_id) === 1 && (
                        <td className='text-end'>
                          <div className='flex-end'>
                            <Tooltip title='Edit' placement='top' className='fs-9 opacity-75'>
                              <div
                                className='btn btn-sm btn-warning radius-50 flex-center same-25px me-2'
                                onClick={() => {
                                  setDetail(m)
                                  setShowModalAddEdit(true)
                                }}
                              >
                                <i className='las la-pencil-alt text-white' />
                              </div>
                            </Tooltip>
                            <Tooltip title='Edit' placement='top' className='fs-9 opacity-75'>
                              <div
                                className='btn btn-sm btn-danger radius-50 flex-center same-25px'
                                onClick={() => {
                                  setDetail(m)
                                  setShowModalDelete(true)
                                }}
                              >
                                <i className='las la-trash-alt text-white' />
                              </div>
                            </Tooltip>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* MODAL ADD EDIT */}
      <ModalAddEdit
        showModal={showModalAddEdit}
        setShowModal={setShowModalAddEdit}
        detail={detail}
        setDetail={setDetail}
        reload={reload}
        setReload={setReload}
      />
      {/* Modal Delete */}
      <Modal
        size='md'
        center={false}
        theme='danger'
        show={showModalDelete}
        setShow={setShowModalDelete}
        title={`Delete User`}
        loading={saveLoading}
        onSubmit={handleDelete}
        buttonText='Delete'
        onHide={() => setDetail({})}
      >
        <div className='w-100 text-center'>
          Are you sure want to remove <span className='fw-600'>&quot;{detail?.name}&quot;</span>{' '}
          from users list ?
        </div>
      </Modal>
    </>
  )
}

export default Index
