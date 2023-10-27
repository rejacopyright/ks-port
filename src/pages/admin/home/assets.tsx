import { addEditHomeAssets, deleteHomeAssets, getHomeAssets } from '@api/home'
import toast from '@components/alert/toast'
import { Button } from '@components/button'
import { CardLoader, SimpleLoader } from '@components/loader'
import { Modal } from '@components/modal'
import { StickyAdmin } from '@helpers'
import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  count: Yup.string().required('Title is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string()
    .max(200, 'Maximal description is 200')
    .required('Description is required'),
})

const Index: FC<any> = () => {
  const [data, setData] = useState<any>([])
  const [reload, setReload] = useState<any>(false)
  const [detail, setDetail] = useState<any>({})
  const [showModal, setShowModal] = useState<any>(false)
  const [showModalDelete, setShowModalDelete] = useState<any>(false)
  const [saveLoading, setSaveLoading] = useState<any>(false)
  const [loading, setLoading] = useState<any>(false)

  useEffect(() => {
    setLoading(true)
    getHomeAssets()
      .then(({ data: { data } = {} }) => {
        if (data?.length) {
          setData(data)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [reload])
  const handleSubmit = (values: any) => {
    setSaveLoading(true)
    addEditHomeAssets(values, detail?.id)
      .then(({ data }) => {
        if (data?.status === 200) {
          setShowModal(false)
          setDetail({})
          setReload(!reload)
          toast({ type: 'success', message: data?.message })
        } else {
          toast({ type: 'error', message: "something wen't wrong. Please try again." })
        }
        setSaveLoading(false)
      })
      .catch(() => {
        toast({ type: 'error', message: "something wen't wrong. Please try again." })
        setSaveLoading(false)
      })
  }
  const handleDelete = () => {
    if (detail?.id) {
      setSaveLoading(true)
      deleteHomeAssets(detail?.id)
        .then(({ data }) => {
          if (data?.success) {
            setShowModalDelete(false)
            setDetail({})
            setReload(!reload)
          }
          setSaveLoading(false)
        })
        .finally(() => {
          setReload(!reload)
        })
    }
  }
  if (loading) {
    return (
      <div className='row mt-3'>
        <SimpleLoader count={1} height={35} className='col-12 w-150px ms-auto mb-4' />
        <CardLoader count={6} className='col-md-4 col-sm-6 mb-3' />
      </div>
    )
  }
  return (
    <>
      <StickyAdmin>
        <div className='bg-white shadow-sm rounded mx-n2 text-center mb-3'>
          <div className='row flex-start p-3'>
            <div className='col-auto ms-auto'>
              <div className='btn fs-8 btn-primary text-white' onClick={() => setShowModal(true)}>
                <i className='las la-plus me-1' />
                Add Assets
              </div>
            </div>
          </div>
        </div>
      </StickyAdmin>
      <div className='row'>
        {data?.map((e: any, index: any) => (
          <div className='col-md-4 col-sm-6 mb-3' key={index}>
            <div className='h-100 radius-10 shadow-sm hover-md pointer position-relative'>
              <div className='p-3 mb-4'>
                <div className='fw-400 fs-3 text-primary'>{e?.count}</div>
                <div className='fw-400 mb-1'>{e?.title}</div>
                <div className='fw-200 mb-2'>{e?.description}</div>
              </div>
              <div className='px-3 pt-2 position-absolute bottom-0 w-100 flex-center mb-2 border-top'>
                <Button
                  text='Edit'
                  theme='light-warning'
                  className='flex-center fs-9 me-2'
                  icon='pencil-alt'
                  iconClass='fs-9'
                  dir='left'
                  onClick={() => {
                    setDetail(e)
                    setShowModal(true)
                  }}
                />
                <Button
                  text='Delete'
                  theme='light-danger'
                  className='flex-center fs-9'
                  icon='trash-alt'
                  iconClass='fs-9'
                  dir='left'
                  onClick={() => {
                    setDetail(e)
                    setShowModalDelete(true)
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit */}
      <Modal
        size='md'
        show={showModal}
        setShow={setShowModal}
        title={`Add Assets`}
        loading={false}
        footer={false}
        onHide={() => setDetail({})}
      >
        <div className='w-100'>
          <Formik
            enableReinitialize
            validateOnMount={false}
            validationSchema={validationSchema}
            initialValues={{
              count: detail?.count || '',
              title: detail?.title || '',
              description: detail?.description || '',
            }}
            onSubmit={handleSubmit}
          >
            {({ errors, isValid }: any) => (
              <Form autoComplete='off' noValidate>
                <div className='row'>
                  <div className='col-12 col-md-4 mb-3'>
                    <div className='fs-8 fw-500 mb-1 text-primary'>Count</div>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      name='count'
                      placeholder='Enter Count'
                    />
                    {errors?.count && <div className='text-danger fs-9 mt-1'>{errors?.count}</div>}
                  </div>
                  <div className='col-12 col-md-8 mb-3'>
                    <div className='fs-8 fw-500 mb-1 text-primary'>Title</div>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      name='title'
                      placeholder='Enter Title'
                    />
                    {errors?.title && <div className='text-danger fs-9 mt-1'>{errors?.title}</div>}
                  </div>
                  <div className='col-12 mb-3'>
                    <div className='fs-8 fw-500 mb-1 text-primary'>Description</div>
                    <Field
                      type='text'
                      as='textarea'
                      className='form-control form-control-solid'
                      name='description'
                      placeholder='Enter Description'
                    />
                    {errors?.description && (
                      <div className='text-danger fs-9 mt-1'>{errors?.description}</div>
                    )}
                  </div>

                  {/* BUTTONS */}
                  <div className='flex-end'>
                    <Button
                      text='Cancel'
                      theme='white'
                      className='text-dark flex-center'
                      icon={false}
                      iconClass='fs-5'
                      dir='left'
                      onClick={() => setShowModal(false)}
                    />
                    <Button
                      type='submit'
                      text='Save'
                      theme='primary'
                      className='text-white flex-center'
                      icon='check'
                      iconClass='fs-7'
                      dir='left'
                      loading={saveLoading}
                      disabled={!isValid}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

      {/* Modal Delete */}
      <Modal
        size='md'
        theme='danger'
        show={showModalDelete}
        setShow={setShowModalDelete}
        title={`Delete Assets`}
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
