import { useState } from 'react'
import { setUser } from '@redux'
import { Link } from 'react-router-dom'
import { login } from '@api/auth'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import toast from '@components/alert/toast'
import { appName } from '@helpers/config'

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
    <div className='container-fluid vh-100 flex-center w-100 bg-fa'>
      <Formik
        enableReinitialize
        // validateOnMount
        validateOnChange
        validationSchema={validationSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }) => (
          <Form className='w-100'>
            <div className='row'>
              <div className='col-12 col-md-8 mx-auto'>
                <div className='d-flex radius-5 overflow-hidden'>
                  <div
                    className='d-none d-md-block col-md-6'
                    style={{
                      background: `#fff url(${require('@images/stock/bg-1.jpg')}) center / cover no-repeat`,
                    }}
                  >
                    <div className='flex-center text-white vh-70'>
                      <div className='text-center'>
                        <div className='fw-600 fs-5 text-uppercase'>{appName}</div>
                        <div className='fw-300 fs-7'>Login for admin to manage web contents.</div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-8 col-md-6 mx-auto bg-white p-4 position-relative'>
                    <div className='fs-3 fw-600 text-primary text-center mt-3'>LOGIN</div>
                    <div className='fs-8 text-center mb-5'>
                      Login for admin to manage web contents.
                    </div>
                    <div className='mb-3'>
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
                    <div className='mb-3'>
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
                    <div className='row pt-3'>
                      <div className='col mb-3 text-nowrap'>
                        <Link to='/'>
                          <div className='btn btn-sm border-0 px-3 py-2'>
                            <i className='las la-arrow-left me-2 text-cc' />
                            <span className='text-cc'>Back To Homepage</span>
                          </div>
                        </Link>
                      </div>
                      <div className='col mb-3 text-nowrap'>
                        <button
                          type='submit'
                          disabled={!isValid}
                          className='btn btn-sm w-100 btn-primary text-white px-3 py-2'
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
                    <div className='text-center fs-8 mt-5'>
                      <div className='mb-1'>Doesn't remember your password ?</div>
                      <div className='mb-2'>
                        <span className='me-2'>Click</span>
                        <Link
                          to='/forgot-password'
                          className='fw-500 text-primary fs-7 pointer text-hover-underline underline-offset-3'
                        >
                          "Forgot Password"
                        </Link>
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
