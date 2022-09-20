import { useState } from 'react'
import { setUser } from '@redux'
import { Link } from 'react-router-dom'
import { login } from '@api/auth'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import toast from '@components/alert/toast'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

const Index = () => {
  const [loadingBtn, setLoadingBtn] = useState(false)
  const handleSubmit = (values) => {
    setLoadingBtn(true)
    const { username, password } = values || {}
    login({ username, password }).then(async ({ data }) => {
      if (data?.success) {
        const {
          user,
          token: { access_token: token },
        } = data || {}
        await setUser({ ...user, token })
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window?.location?.reload()
          }
        }, 100)
      } else {
        toast({ type: 'error', message: data?.message })
      }
      setLoadingBtn(false)
    })
  }
  return (
    <div className='container-fluid vh-90 flex-center w-100'>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={validationSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }) => (
          <Form>
            <div className='row'>
              <div className='col-12 col-md-6 offset-md-3'>
                <div className='bg-fas p-3 rounded'>
                  <div className='row'>
                    <div className='col-12 text-center mb-3'>
                      <div className='border-bottom border-f2 pb-2'>
                        <div className='fs-3 fw-600 text-primary'>LOGIN</div>
                        <div className='fs-8 fw-600s'>Lorem ipsum dolor sit amet.</div>
                      </div>
                    </div>
                    <div className='col-12 mb-3'>
                      <label className='d-block mb-1'>Username</label>
                      <Field
                        type='text'
                        name='username'
                        placeholder='Enter Username'
                        className='form-control form-control-sm form-control-solid py-2'
                        // defaultValue='Reja Jamil'
                      />
                      {errors?.username && (
                        <div className='fs-9 mt-1 text-danger'>{errors?.username}</div>
                      )}
                    </div>
                    <div className='col-12 mb-3'>
                      <label className='d-block mb-1'>Password</label>
                      <Field
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        className='form-control form-control-sm form-control-solid py-2'
                        // defaultValue={Date.now()}
                      />
                      {errors?.password && (
                        <div className='fs-9 mt-1 text-danger'>{errors?.password}</div>
                      )}
                    </div>
                    <div className='col-12 mt-1 text-end'>
                      <div className='border-top border-f2 pt-3'>
                        <Link to='/'>
                          <div className='btn btn-sm border-0 px-3'>
                            <i className='las la-arrow-left me-2 text-cc' />
                            <span className='text-cc'>Back To Homepage</span>
                          </div>
                        </Link>
                        <button
                          type='submit'
                          disabled={!isValid}
                          className='btn btn-sm btn-primary text-white px-3'
                        >
                          {loadingBtn ? (
                            <span className='indicator-progress d-block'>
                              Please wait...
                              <span className='spinner-border spinner-border-sm align-middle ms-2' />
                            </span>
                          ) : (
                            <>
                              <i className='las la-check me-2 ms-n1' />
                              <span>LOGIN</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default Index
