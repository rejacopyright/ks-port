import { useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '@components/pintura'
import { TextEditor } from '@components/form'
import { Button } from '@components/button'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { addEditServices, detailServices } from '@api/services'
import toast from '@components/alert/toast'
import { CardLoader } from '@components/loader'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})

const Index = () => {
  const navigate = useNavigate()
  const { type, id } = useParams()
  const inputFileRef = useRef()
  const [src, srcSet] = useState(false)
  const [image, setImage] = useState(undefined)
  const [showModalImg, setShowModalImg] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      detailServices(id)
        .then(({ data }) => {
          if (data?.id) {
            setDetail(data)
          }
          if (data?.file) {
            setImage(data?.file)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id])

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
    params.type = type
    if (image !== detail?.file) {
      params.file = image
    }
    addEditServices(params, detail?.id)
      .then(({ data }) => {
        if (data?.status === 200) {
          setDetail({})
          setReload(!reload)
          setImage(undefined)
          toast({ type: 'success', message: data?.message })
          navigate(-1)
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
      <div className='mt-4'>
        <CardLoader count={3} className='col-12 mb-4' />
      </div>
    )
  }

  return (
    <div className='row'>
      <div className='col-12'>
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
          ratio={1}
        />
      </div>
      <div className='col-12'>
        <Formik
          enableReinitialize
          validateOnMount
          validationSchema={validationSchema}
          initialValues={{ title: detail?.title || '', description: detail?.description || '' }}
          onSubmit={handleSubmit}
        >
          {({ errors, isValid, setFieldValue }) => (
            <Form autoComplete='off' noValidate>
              <div className='row'>
                <div className='col-12 mb-3'>
                  <div
                    className={`position-relative w-250px h-125px mx-auto flex-center radius-10 overflow-hidden ${
                      !image ? 'bg-light-primary border border-primary border-dashed' : ''
                    }`}
                    style={
                      image
                        ? {
                            background: `url(${image}) center / cover no-repeat`,
                          }
                        : {}
                    }
                  >
                    <input
                      ref={inputFileRef}
                      type='file'
                      accept='image/png, image/jpeg'
                      className='d-none'
                      multiple={false}
                      onChange={onChangeImage}
                    />
                    {!image && (
                      <div className='absolute-center'>
                        <div
                          className='btn btn-sm fs-9 btn-primary text-white'
                          onClick={() => inputFileRef?.current?.click()}
                        >
                          Browse Image
                        </div>
                      </div>
                    )}
                  </div>
                  {!!image && (
                    <div className='flex-center mt-1'>
                      <div
                        className='btn btn-sm fs-9 btn-primary text-white'
                        onClick={() => inputFileRef?.current?.click()}
                      >
                        Change
                      </div>
                      <div
                        className='btn btn-sm fs-9 btn-danger text-white ms-1 d-none'
                        onClick={() => setImage(undefined)}
                      >
                        Remove
                      </div>
                    </div>
                  )}
                </div>
                <div className='col-12 col-md-6 mb-3'>
                  <div className='fs-8 fw-500 mb-1'>Title</div>
                  <Field
                    type='text'
                    className='form-control form-control-solid'
                    name='title'
                    placeholder='Enter Title'
                  />
                  {errors?.title && <div className='text-danger fs-9 mt-1'>{errors?.title}</div>}
                </div>
                <div className='col-12 mb-3'>
                  <div className='fs-8 fw-500 mb-1'>Description</div>
                  <TextEditor
                    id='editor'
                    placeholder='Enter Description Here'
                    onChange={(e) => {
                      setFieldValue('description', e)
                    }}
                  >
                    {detail?.description || ''}
                  </TextEditor>
                  {errors?.description && (
                    <div className='text-danger fs-9 mt-1'>{errors?.description}</div>
                  )}
                </div>

                {/* BUTTONS */}
                <div className='flex-end'>
                  <Button
                    type='button'
                    text='Back'
                    theme='white'
                    className='flex-center'
                    icon={false}
                    iconClass='fs-5'
                    dir='left'
                    loading={false}
                    disabled={false}
                    onClick={() => navigate(-1)}
                  />
                  <Button
                    type='submit'
                    text='Save'
                    theme='primary'
                    className='text-white flex-center'
                    icon='check'
                    iconClass='fs-6'
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
    </div>
  )
}

export default Index
