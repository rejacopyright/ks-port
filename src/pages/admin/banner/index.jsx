import { useEffect, useRef, useState } from 'react'
import Editor from '@components/pintura'
import { Modal } from '@components/modal'
import { Button } from '@components/button'
import { Formik, Form } from 'formik'
import { getBanner, editBanner } from '@api/banner'
import toast from '@components/alert/toast'
import { CardLoader } from '@components/loader'
import banner from '@images/banner.jpg'

const Index = () => {
  const inputFileRef = useRef()
  const [data, setData] = useState([])
  const [src, srcSet] = useState(false)
  const [image, setImage] = useState()
  const [showModal, setShowModal] = useState(false)
  const [showModalImg, setShowModalImg] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getBanner()
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
  const event = ({ event }) => {
    if (['hide', 'close']?.includes(event)) {
      setShowModalImg(false)
    }
  }
  const inputChange = () => {
    // onImageChange
  }
  const onFinish = ({ dest }) => {
    const reader = new FileReader()
    reader.readAsDataURL(dest)
    reader.onloadend = () => {
      const base64 = reader.result
      setImage(base64)
    }
  }
  const handleSubmit = (e) => {
    setSaveLoading(true)
    const params = Object.assign({}, e)
    if (image !== detail?.file) {
      params.file = image
    }
    editBanner(params, detail?.module)
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
        {data?.map((e, index) => (
          <div className='col-md-6 my-3' key={index}>
            <div className='position-relative'>
              <div
                className='position-relative h-100px shadow-sm hover-xs radius-10 overflow-hidden p-2'
                style={{ background: `url(${e?.file || banner}) center / cover no-repeat` }}
              >
                <div className='absolute-center z-2 flex-center w-100 h-100 hover-anim dark'>
                  <div className='flex-center p-2 p-md-4'>
                    <div
                      className='btn btn-sm btn-primary text-white text-nowrap'
                      onClick={() => {
                        setDetail(e)
                        setImage({})
                        setShowModal(true)
                        inputFileRef?.current?.click()
                      }}
                    >
                      Change Image
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='p-2 text-center text-uppercase fs-9 fw-500 text-primary mt-2'>
              {e?.module}
            </div>
          </div>
        ))}
        <input
          ref={inputFileRef}
          type='file'
          accept='image/png, image/jpeg'
          className='d-none'
          multiple={false}
          onChange={onChangeImage}
        />
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
        ratio={9 / 3}
      />
      {/* Modal Add / Edit */}
      <Modal
        size='md'
        show={showModal}
        setShow={setShowModal}
        title={`Change`}
        loading={false}
        footer={false}
        onHide={() => {
          setDetail({})
          setImage(undefined)
        }}
      >
        <div className='w-100'>
          <Formik enableReinitialize validateOnMount initialValues={{}} onSubmit={handleSubmit}>
            {({ isValid }) => (
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
                          Change Image
                        </div>
                      </div>
                    </div>
                    {!image && (
                      <div className='text-danger text-center fs-9 mt-1'>File is required</div>
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
                      disabled={!isValid || !image || Object.values(image || {})?.length === 0}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  )
}

export default Index
