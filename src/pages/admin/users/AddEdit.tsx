import { addEditUser } from '@api/users'
import toast from '@components/alert/toast'
import { Button } from '@components/button'
import { Modal } from '@components/modal'
import Editor from '@components/pintura'
import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useRef, useState } from 'react'
import { mapError } from 'src/_helpers/function'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().min(4, 'Minimum 4 characters').required('Username is required'),
  email: Yup.string().email('Wrong email format').required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Require at least 1 special character')
    .matches(/[A-Z]/, 'Require at least 1 uppercase letter')
    .matches(/[0-9]/, 'Require at least 1 number')
    .when('id', {
      is: (val: any) => !val,
      then: () => Yup.string().required('Password is required'),
    }),
  password_confirmation: Yup.string().when('password', {
    is: (val: any) => (val && val.length > 0 ? true : false),
    then: () =>
      Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password')], "Password and Repeat Password didn't match"),
  }),
})

const Index: FC<any> = ({ reload, setReload, detail, setDetail, showModal, setShowModal }) => {
  const inputFileRef: any = useRef()
  const [src, srcSet] = useState<any>(false)
  const [image, setImage] = useState<any>()
  const [showModalImg, setShowModalImg] = useState<any>(false)
  const [saveLoading, setSaveLoading] = useState<any>(false)

  useEffect(() => {
    if (showModal && detail?.avatar) {
      setImage(detail?.avatar)
    } else {
      setImage(undefined)
    }
  }, [showModal, detail?.avatar])

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
    if (image !== detail?.avatar) {
      params.avatar = image
    }
    addEditUser(params, detail?.id)
      .then(({ data }) => {
        if (data?.status === 200) {
          setShowModal(false)
          setDetail({})
          setReload && setReload(!reload)
          setImage(undefined)
          srcSet(false)
          toast({ type: 'success', message: data?.message })
        }
        setSaveLoading(false)
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
        setSaveLoading(false)
      })
  }

  return (
    <>
      <input
        ref={inputFileRef}
        type='file'
        accept='image/png, image/jpeg'
        className='d-none'
        multiple={false}
        onChange={onChangeImage}
      />
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
            validateOnMount={false}
            validationSchema={validationSchema}
            initialValues={{
              id: detail?.id || '',
              name: detail?.name || '',
              username: detail?.username || '',
              email: detail?.email || '',
              password: '',
              password_confirmation: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ errors, isValid }: any) => (
              <Form autoComplete='off' noValidate>
                <div className='row'>
                  <div className='col-12 mb-3'>
                    <div
                      className='position-relative w-125px h-125px mx-auto flex-center border border-primary border-dashed radius-10 overflow-hidden'
                      style={image ? { background: `url(${image}) center / cover no-repeat` } : {}}
                    >
                      <div className='absolute-center'>
                        <div
                          className='btn btn-sm btn-primary text-white'
                          onClick={() => inputFileRef?.current?.click()}
                        >
                          {image ? 'Change' : 'Browse'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 mb-3'>
                    <Field
                      name='id'
                      type='hidden'
                      className='form-control form-control-solid'
                      placeholder='ID'
                    />
                    <div className='fs-8 fw-500 mb-1'>Full Name</div>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      name='name'
                      placeholder='Enter Name'
                    />
                    {errors?.name && <div className='text-danger fs-9 mt-1'>{errors?.name}</div>}
                  </div>
                  <div className='col-12 col-md-6 mb-3'>
                    <div className='fs-8 fw-500 mb-1'>Username</div>
                    <Field
                      type='text'
                      className='form-control form-control-solid'
                      name='username'
                      placeholder='Enter Username'
                    />
                    {errors?.username && (
                      <div className='text-danger fs-9 mt-1'>{errors?.username}</div>
                    )}
                  </div>
                  <div className='col-12 col-md-6 mb-3'>
                    <div className='fs-8 fw-500 mb-1'>Email</div>
                    <Field
                      type='email'
                      className='form-control form-control-solid'
                      name='email'
                      placeholder='Enter Email'
                    />
                    {errors?.email && <div className='text-danger fs-9 mt-1'>{errors?.email}</div>}
                  </div>
                  <div className='col-12 col-md-6 mb-3'>
                    <div className='fs-8 fw-500 mb-1'>Password</div>
                    <Field
                      type='password'
                      className='form-control form-control-solid'
                      name='password'
                      placeholder='Enter Password'
                    />
                    {errors?.password && (
                      <div className='text-danger fs-9 mt-1'>{errors?.password}</div>
                    )}
                  </div>
                  <div className='col-12 col-md-6 mb-3'>
                    <div className='fs-8 fw-500 mb-1'>Repeat Password</div>
                    <Field
                      type='password'
                      className='form-control form-control-solid'
                      name='password_confirmation'
                      placeholder='Repeat Password'
                    />
                    {errors?.password_confirmation && (
                      <div className='text-danger fs-9 mt-1'>{errors?.password_confirmation}</div>
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
                      iconClass='fs-5'
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
    </>
  )
}

export default Index
