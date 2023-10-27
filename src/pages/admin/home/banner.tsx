import { addEditHomeBanner, deleteHomeBanner, getHomeBanner } from '@api/home'
import toast from '@components/alert/toast'
import { Button } from '@components/button'
import { CardLoader } from '@components/loader'
import { Modal } from '@components/modal'
import Editor from '@components/pintura'
import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})

const Index: FC<any> = () => {
  const inputFileRef: any = useRef()
  const [data, setData] = useState<any>([])
  const [src, srcSet] = useState<any>(false)
  const [image, setImage] = useState<any>()
  const [showModal, setShowModal] = useState<any>(false)
  const [showModalImg, setShowModalImg] = useState<any>(false)
  const [showModalDelete, setShowModalDelete] = useState<any>(false)
  const [saveLoading, setSaveLoading] = useState<any>(false)
  const [reload, setReload] = useState<any>(false)
  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState<any>(false)

  useEffect(() => {
    setLoading(true)
    getHomeBanner()
      .then(({ data: { data } = {} }) => {
        if (data?.length) {
          setData(data)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [reload])

  const onChangeImage = () => {
    const files = inputFileRef?.current?.files
    if (files?.length) {
      const file = files?.[0]
      srcSet(file)
      setShowModalImg(true)
      inputFileRef.current.value = ''
    }
  }
  const event = ({ event }: any) => {
    if (['hide', 'close']?.includes(event)) {
      setShowModalImg(false)
    }
  }
  const inputChange = () => {
    // onImageChange
  }
  const onFinish = ({ dest }: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(dest)
    reader.onloadend = () => {
      const base64 = reader.result
      setImage(base64)
    }
  }
  const handleSubmit = (e: any) => {
    setSaveLoading(true)
    const params = Object.assign({}, e)
    if (image !== detail?.file) {
      params.file = image
    }
    addEditHomeBanner(params, detail?.id)
      .then(({ data }) => {
        if (data?.status === 200) {
          setShowModal(false)
          setDetail({})
          setReload(!reload)
          setImage(undefined)
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
      deleteHomeBanner(detail?.id)
        .then(({ data }) => {
          if (data?.success) {
            setShowModalDelete(false)
            setDetail({})
            setImage(undefined)
            setReload(!reload)
          }
          setSaveLoading(false)
        })
        .catch(() => {
          setReload(!reload)
        })
    }
  }
  if (loading) {
    return (
      <div className='row'>
        <CardLoader count={2} className='col-lg-4 col-md-6 my-3' />
      </div>
    )
  }
  return (
    <>
      <div className='row'>
        {data?.map((e: any, index: any) => (
          <div className='col-lg-4 col-md-6 my-3' key={index}>
            <div className='position-relative'>
              <div
                className='position-relative h-150px shadow-md-bold hover-xs radius-10 overflow-hidden p-2'
                style={{ background: `url(${e?.file}) center / cover no-repeat` }}
              >
                <div className='absolute-center z-2 flex-center w-100 h-100 hover-anim dark'>
                  <div className='flex-center p-2 p-md-4'>
                    <div
                      className='btn btn-sm mx-1 flex-center btn-light-warning text-warning same-25px radius-50'
                      onClick={() => {
                        setDetail(e)
                        setImage(e?.file)
                        setShowModal(true)
                      }}
                    >
                      <i className='las la-pencil-alt fs-6' />
                    </div>
                    <div
                      className='btn btn-sm mx-1 flex-center btn-light-danger text-danger same-25px radius-50'
                      onClick={() => {
                        setDetail(e)
                        setShowModalDelete(true)
                      }}
                    >
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
                  {e?.title}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='col-lg-4 col-md-6 my-3'>
          <div className='flex-center h-150px bg-light-primary text-primary fw-500 border border-dd border-dashed radius-15'>
            <input
              ref={inputFileRef}
              type='file'
              accept='image/png, image/jpeg'
              className='d-none'
              multiple={false}
              onChange={onChangeImage}
            />
            <div
              className='btn btn-sm btn-primary text-white'
              onClick={() => {
                setDetail({})
                setShowModal(true)
              }}
            >
              Add Banner
            </div>
          </div>
        </div>
      </div>
      <Editor
        show={showModalImg}
        browse={false}
        event={event}
        onFinish={onFinish}
        onInputChange={inputChange}
        onClose={() => setShowModalImg(false)}
        src={src}
        preview={false}
        modal={true}
        ratio={4 / 2}
      />
      {/* Modal Add / Edit */}
      <Modal
        size='md'
        show={showModal}
        setShow={setShowModal}
        title={`Add Banner`}
        loading={false}
        footer={false}
        onHide={() => {
          setDetail({})
          setImage(undefined)
        }}
      >
        <div className='w-100'>
          <Formik
            enableReinitialize
            validateOnMount
            validationSchema={validationSchema}
            initialValues={{ title: detail?.title || '', description: detail?.description || '' }}
            onSubmit={handleSubmit}
          >
            {({ errors, isValid }: any) => (
              <Form autoComplete='off' noValidate>
                <div className='row'>
                  <div className='col-12 mb-3'>
                    <div
                      className='position-relative w-250px h-125px mx-auto flex-center border border-primary border-dashed radius-10 overflow-hidden'
                      style={image ? { background: `url(${image}) center / cover no-repeat` } : {}}
                    >
                      <div className='absolute-center'>
                        <div
                          className='btn btn-sm btn-primary text-white'
                          onClick={() => inputFileRef?.current?.click()}
                        >
                          {image ? 'Change' : 'Browse'} Image
                        </div>
                      </div>
                    </div>
                    {!image && (
                      <div className='text-danger text-center fs-9 mt-1'>File is required</div>
                    )}
                  </div>
                  <div className='col-12 col-md-6 mb-3'>
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
                      icon={false}
                      iconClass='fs-5'
                      dir='left'
                      loading={saveLoading}
                      disabled={!isValid || !image}
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
        title={`Delete Banner`}
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
