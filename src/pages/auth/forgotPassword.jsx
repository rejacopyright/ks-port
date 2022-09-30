import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendResetPasswordLink } from '@api/auth'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  user: Yup.string().required('Field is required'),
})

const Index = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(undefined)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const handleSubmit = (values) => {
    setLoadingBtn(true)
    const { user } = values || {}
    sendResetPasswordLink({ user, url: `${window?.location?.origin}/reset-password` })
      .then(async ({ data }) => {
        if (data?.success) {
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              navigate({
                pathname: '/check-password',
                state: data?.user,
              })
            }
          }, 100)
        }
        setError(undefined)
      })
      .catch((err) => {
        setError(err?.response?.data?.message)
      })
      .finally(() => {
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
        initialValues={{ user: '' }}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid }) => (
          <Form className='w-100'>
            <div className='row'>
              <div className='col-12 col-md-6 col-lg-4 mx-auto bg-white p-4 position-relative'>
                {error && (
                  <div className='bg-light-danger text-danger rounded p-3 d-flex mb-3'>
                    <i className='fas fa-exclamation-circle fs-7 text-danger mt-1' />
                    <span className='ms-2'>{error}</span>
                  </div>
                )}
                <div className='fs-6 fw-600 text-primary text-center'>FORGOT PASSWORD</div>
                <div className='fs-8 text-center mb-4'>
                  Input username or email to set new password
                </div>
                <div className='mb-3'>
                  <Field
                    type='text'
                    name='user'
                    placeholder='Enter Username / Email'
                    className='form-control form-control-solid border-primary py-3 fs-6'
                    // defaultValue='Reja Jamil'
                  />
                  {errors?.user && <div className='fs-8 mt-1 text-danger'>{errors?.user}</div>}
                </div>
                <div className='row pt-3'>
                  <div className='col mb-3 text-nowrap'>
                    <div
                      className='btn btn-sm bg-light w-100 border-0 px-3 py-2'
                      onClick={() => navigate(-1)}
                    >
                      <i className='las la-arrow-left me-2 text-dark' />
                      <span className='text-dark'>Back</span>
                    </div>
                  </div>
                  <div className='col mb-3 text-nowrap'>
                    <button
                      type='submit'
                      disabled={!isValid || loadingBtn}
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
                          <span>Send Reset Password Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className='text-center fs-8 mt-3'>
                  <span className='me-2'>Already have an account ?</span>
                  <Link
                    to='/login'
                    className='fw-500 text-primary fs-7 pointer text-hover-underline underline-offset-3'
                  >
                    "Login"
                  </Link>
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
