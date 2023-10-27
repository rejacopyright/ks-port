import { addEditMedia, detailMedia } from '@api/news'
import toast from '@components/alert/toast'
import { Button } from '@components/button'
import { TextEditor } from '@components/form'
import { CardLoader } from '@components/loader'
import Editor from '@components/pintura'
import { Field, Form, Formik } from 'formik'
import qs from 'qs'
import { FC, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

const validationSchema: any = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
})

const Index: FC<any> = () => {
  const navigate: any = useNavigate()
  const { id }: any = useParams()
  const { search }: any = useLocation()
  const searchParams: any = qs.parse(search, { ignoreQueryPrefix: true })
  const inputFileRef: any = useRef()
  const [src, srcSet] = useState<any>(false)
  const [image, setImage] = useState<any>(undefined)
  const [showModalImg, setShowModalImg] = useState<any>(false)
  const [saveLoading, setSaveLoading] = useState<any>(false)
  const [reload, setReload] = useState<any>(false)
  const [detail, setDetail] = useState<any>({})
  const [loading, setLoading] = useState<any>(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      detailMedia(id)
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
    addEditMedia(params, detail?.id)
      .then(({ data }) => {
        if (data?.status === 200) {
          if (searchParams?.utm_source === 'usr') {
            setTimeout(() => {
              window?.close()
            }, 300)
          } else {
            toast({ type: 'success', message: data?.message })
            setDetail({})
            setReload(!reload)
            setImage(undefined)
            navigate(-1)
          }
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
          ratio={4 / 3}
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
          {({ errors, isValid, setFieldValue }: any) => (
            <Form autoComplete='off' noValidate>
              <div className='row'>
                <div className='col-12 mb-3'>
                  <div
                    className={`position-relative w-250px mx-auto flex-center radius-10 overflow-hidden ${
                      !image ? 'bg-light-primary border border-primary border-dashed h-125px' : ''
                    }`}
                    // style={image ? { background: `url(${image}) center / contain no-repeat` } : {}}
                  >
                    {image && <img src={image} className='h-auto' alt='' />}
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
                    onChange={(e: any) => {
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
